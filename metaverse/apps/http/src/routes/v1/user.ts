import { Router } from "express";
import { UpdateMetadataSchema } from "../../types";
import client from "@metaverse/db/client"
import { userMiddleware } from "../../middleware/user";

export const userRouter = Router();

userRouter.get("/me", userMiddleware, async (req, res) => {
    const user = await client.user.findUnique({
        where: {
            id: req.userId!
        }
    })

    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    res.json(user);
});

userRouter.get("/metadata", userMiddleware, async (req, res) => {
  const u = await client.user.findUnique({
    where: { id: req.userId! },
    select: { avatarId: true },
  });
  res.json({ avatarId: u?.avatarId ?? null });
});

userRouter.post("/metadata", userMiddleware, async (req, res) => {


    const parsedData = UpdateMetadataSchema.safeParse(req.body);
    // console.log(`Schema validation success:`, parsedData.success);
    
    if (!parsedData.success) {
        console.log("Validation errors:", parsedData.error.errors);
        res.status(400).json({message: "Validation failed", errors: parsedData.error.errors});
        return;
    }

    // console.log(`Parsed avatarId:`, parsedData.data.avatarId);

    try {
        // Check if avatar exists
        const avatarExists = await client.avatar.findUnique({
            where: { id: parsedData.data.avatarId }
        });
        
        if (!avatarExists) {
            // console.log("Avatar not found:", parsedData.data.avatarId);
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
        // console.log("Database error:", e);
        res.status(500).json({message: "Internal server error"});
    }
});

userRouter.get("/metadata/bulk", async (req, res) => {
    const userIdString = (req.query.ids ?? "[]") as string;
    const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
    // console.log(userIds)
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