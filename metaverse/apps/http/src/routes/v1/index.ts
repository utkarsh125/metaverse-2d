// this is going to export our root router

import { SigninSchema, SignupSchema } from "../../types";
import {compare, hash} from "../../scrypt"

import { JWT_PASSWORD } from "../../config";
import { Router } from "express";
import { adminRouter } from "./admin";
import client from "@metaverse/db/client"
// import client from "@metaverse/db";
import jwt from "jsonwebtoken";
import { spaceRouter } from "./space";
import { userMiddleware } from "../../middleware/user";
import { userRouter } from "./user";

//any time a request comes to "/api/v1" it will be handled by this router

export const router = Router();

router.post("/signup", async(req, res) => {
    //check the user
    const parseData = SignupSchema.safeParse(req.body)

    if (!parseData.success) {
        res.status(400).json({
            message: "Validation failed"
        })
        return
    }

    // accept type for tests
    const isAdmin = req.body.type === "admin";
    const role = isAdmin ? "Admin" : "User";
    
    const hashedPassword = await hash(parseData.data.password);
    try {

        const user = await client.user.create({
            data: {
                username: parseData.data.username,
                password: hashedPassword,
                role
            }
        })

        res.json({
            userId: user.id
        })
    } catch (error) {
        res.status(400).json({
            message: "User already exists"
        })
    }


})

router.post("/signin", async(req, res) => {

    const parseData = SigninSchema.safeParse(req.body);

    if(!parseData.success){
        res.status(403).json({
            message: "Validation failed"
        })
        return
    }

    try {
        const user = await client.user.findUnique({
            where:{
                username: parseData.data.username
            }
        })
        //check if user is valid
        if(!user){
            res.status(403).json({
                message: "User not found"
            })
            return
        }

        //but if it is valid User -> check password (compare it with hashedPassword)
        const isValid = await compare(parseData.data.password, user.password)
        if(!isValid){
            res.status(403).json({
                message: "Invalid Password"
            })
            return
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, JWT_PASSWORD)

        res.json({
            token 
        })
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
    
    
})


router.get("/elements", async (req, res) => {
    const elements = await client.element.findMany()
    res.json({elements: elements.map(e => ({
        id: e.id,
        imageUrl: e.imageUrl,
        width: e.width,
        height: e.height,
        static: e.static
    }))})
})

router.get("/avatars", async(req, res) => {
    const avatars = await client.avatar.findMany()
    res.json({avatars: avatars.map(x => ({
        id: x.id,
        imageUrl: x.imageUrl,
        name: x.name,
    }))})
})


router.get("/maps",
    //TODO: userMiddleware, 
    async(req, res) => {
    const maps = await client.map.findMany({
        select:{
            id: true,
            name: true,
            thumbnail: true,
            width: true,
            height: true,
        },
    });

    //normalize dimensions into string
    const payload = maps.map(m => ({
        id: m.id,
        name: m.name,
        thumbnail: m.thumbnail,
        dimensions: `${m.width}x${m.height}`
    }));
    res.json({
        maps: payload
    })
})
// any request that starts with /user will be handled by userRouter
router.use("/user", userRouter)
// any request that starts with /space will be handled by spaceRouter
router.use("/space", spaceRouter)
// any request that starts with /admin will be handled by adminRouter
router.use("/admin", adminRouter)