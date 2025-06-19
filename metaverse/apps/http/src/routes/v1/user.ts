import { Router } from "express";
import { UpdateMetadataSchema } from "../../types";
import client from "@metaverse/db/client"
import { userMiddleware } from "../../middleware/user";

export const userRouter = Router();

// userRouter.post("/metadata", userMiddleware, async (req, res) => {
//     // Add safety check
//     if (res.headersSent) return;
    
//     const parsedData = UpdateMetaverseSchema.safeParse(req.body)     
//     console.log(`AvatarId: ${parsedData.data?.avatarId}`)  //receiving this as undefined.,
//     if (!parsedData.success) {
//         console.log("parsed data incorrect", parsedData.error)
//         res.status(400).json({message: "Validation failed"})
//         return
//     }
    
//     try {
//         // First check if avatar exists
//         const avatarExists = await client.avatar.findUnique({
//             where: { id: parsedData.data.avatarId }
//         });
        
    
//         if (!avatarExists) {
//             // console.log("Avatar not found:", parsedData.data.avatarId)
//             res.status(400).json({message: "Invalid avatar ID"})
//             return
//         }
        
//         await client.user.update({
//             where: {
//                 id: req.userId
//             },
//             data: {
//                 avatarId: parsedData.data.avatarId
//             }
//         })

        
        
//         if (!res.headersSent) {
//             res.json({message: "Metadata updated"})
//         }
//     } catch(e) {
//         // console.log("Database error:", e)
//         if (!res.headersSent) {
//             res.status(500).json({message: "Internal server error"})
//         }
//     }
// })

// userRouter.get("/metadata/bulk", async (req, res) => {
//     const userIdString = (req.query.ids ?? "[]") as string;
//     const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
//     console.log(userIds)
    
//     try {
//         const metadata = await client.user.findMany({
//             where: {
//                 id: {
//                     in: userIds
//                 }
//             }, select: {
//                 avatar: true,
//                 id: true
//             }
//         })

//         res.json({
//             avatars: metadata.map(m => ({
//                 userId: m.id,
//                 avatarId: m.avatar?.imageUrl
//             }))
//         })
//     } catch(e) {
//         console.log("Error in bulk metadata:", e)
//         // return res.status(500).json({message: "Internal server error"})
//     }
// })

userRouter.post("/metadata", userMiddleware, async (req, res) => {


    const parsedData = UpdateMetadataSchema.safeParse(req.body);
    console.log(`Schema validation success:`, parsedData.success);
    
    if (!parsedData.success) {
        console.log("Validation errors:", parsedData.error.errors);
        res.status(400).json({message: "Validation failed", errors: parsedData.error.errors});
        return;
    }

    console.log(`Parsed avatarId:`, parsedData.data.avatarId);

    try {
        // Check if avatar exists
        const avatarExists = await client.avatar.findUnique({
            where: { id: parsedData.data.avatarId }
        });
        
        if (!avatarExists) {
            console.log("Avatar not found:", parsedData.data.avatarId);
            res.status(400).json({message: "Invalid avatar ID"});
            return;
        }
        
        await client.user.update({
            where: {
                id: req.userId
            },
            data: {
                avatarId: parsedData.data.avatarId
            }
        });
        
        res.json({message: "Metadata updated"});
    } catch(e) {
        console.log("Database error:", e);
        res.status(500).json({message: "Internal server error"});
    }
});

userRouter.get("/metadata/bulk", async (req, res) => {
    const userIdString = (req.query.ids ?? "[]") as string;
    const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
    console.log(userIds)
    const metadata = await client.user.findMany({
        where: {
            id: {
                in: userIds
            }
        }, select: {
            avatar: true,
            id: true
        }
    })

    res.json({
        avatars: metadata.map(m => ({
            userId: m.id,
            avatarId: m.avatar?.imageUrl
        }))
    })
})