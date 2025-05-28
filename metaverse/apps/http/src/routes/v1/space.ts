import { CreateSpaceSchema } from "../../types";
import { Router } from "express";
import client from "@metaverse/db/client"
import { userMiddleware } from "../../middleware/user";
export const spaceRouter = Router();

// the index.ts file handles /api/v1
// and /space is handled by routes/v1
spaceRouter.post("/", userMiddleware, async(req, res) => {

    const parsedData = CreateSpaceSchema.safeParse(req.body)

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation Failed"
        })
        return
    }

    //if parsedData.data.mapId doesn't exists (no space so create one)
     if (!parsedData.data.mapId) {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                creatorId: req.userId!
            }
        });
        res.json({spaceId: space.id})
        return;
    }

    const map = await client.map.findFirst({
        where: {
            id: parsedData.data.mapId
        },
        select: {
            mapElements: true,
            width: true,
            height: true,
        }
    })

    console.log("after")

    if(!map){
        //if map doesn't exisst then
        res.status(400).json({
            message:"Map not found"
        })
        return;
    }

    console.log("map.mapElements.length: ", map.mapElements.length)

    let space = await client.$transaction(async() => {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,
                creatorId: req.userId!
            }
        })

        //TODO: 4:37:00
    });

    

})

spaceRouter.delete("/:spaceId", (req, res) => {

})

spaceRouter.get("/all", (req, res) => {

})

spaceRouter.post("/element", (req, res) => {

})

spaceRouter.delete("/element", (req, res) => {

})

spaceRouter.get("/:spaceId", (req, res) => {

})