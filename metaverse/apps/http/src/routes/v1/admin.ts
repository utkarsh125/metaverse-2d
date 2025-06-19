import { AddElementSchema, CreateAvatarSchema, CreateElementSchema, CreateMapSchema, UpdateElementSchema } from "../../types";

import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin";
import client from "@metaverse/db/client"

export const adminRouter = Router();

//The admin endpoint has four routes
// /api/v1/space


adminRouter.get("/element", adminMiddleware, async (req, res) => {

    const parsedData = CreateElementSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({
            message: "Validation failed"
        })
        return
    }

    const element = await client.element.create({
        data: {
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static,
            imageUrl: parsedData.data.imageUrl
        }
    })

    res.json({
        id: element.id
    })

})

adminRouter.put("/element/:elementId", adminMiddleware, async(req, res) => {

    const parsedData = UpdateElementSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({
            message: "Validation failed"
        })
        return
    }

    const element = await client.element.update({

        where: {
            id: req.params.elementId 
        },
        data: {
            imageUrl: parsedData.data?.imageUrl
        },
    })

    res.json({
        message: "Element updated"
    })
})


//The metadata issue was here but is now working.
adminRouter.post("/avatar", async (req, res) => {
    const parsedData = CreateAvatarSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    const avatar = await client.avatar.create({
        data: {
            name: parsedData.data.name,
            imageUrl: parsedData.data.imageUrl
        }
    })
    res.json({avatarId: avatar.id})
})



adminRouter.post("/map", async(req, res) => {

    const parsedData = CreateMapSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({
            message: "Validation failed"
        })
        return
    }

    const map = await client.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                create: parsedData.data?.defaultElements.map(e => ({
                    elementId: e.elementId,
                    x: e.x,
                    y: e.y
                }))
            }

        }
    })

    res.json({
        id: map.id
    })
})