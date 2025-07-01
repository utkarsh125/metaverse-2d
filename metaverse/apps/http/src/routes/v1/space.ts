import { AddElementSchema, CreateElementSchema, CreateSpaceSchema, deleteElementSchema } from "../../types";

import { Router } from "express";
import client from "@metaverse/db/client"
import { userMiddleware } from "../../middleware/user";
import { prisma } from "../../config";
import { z } from "zod";

export const spaceRouter = Router();

// the index.ts file handles /api/v1
// and /space is handled by routes/v1
spaceRouter.post("/", userMiddleware, async(req, res) => {

    console.log("[DEBUG] userId:", req.userId);
    console.log("[DEBUG] req.body:", req.body);

    const parsedData = CreateSpaceSchema.safeParse(req.body)

    if (!parsedData.success) {
        console.log("[DEBUG] Validation failed:", parsedData.error);
        res.status(400).json({
            message: "Validation Failed"
        })
        return
    }

    console.log("[DEBUG] parsedData:", parsedData.data);

    //if parsedData.data.mapId doesn't exists (no space so create one)
    //if the user wants a specific map -> if not then make an empty space for space it
     if (!parsedData.data.mapId) {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                creatorId: req.userId!,
                thumbnail: null,
            }
        });
        console.log("[DEBUG] Created space (no map):", space);
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
            thumbnail: true,
        }
    })

    if(!map){
        console.log("[DEBUG] Map not found for mapId:", parsedData.data.mapId);
        res.status(400).json({
            message:"Map not found"
        })
        return;
    }

    console.log("[DEBUG] map.mapElements.length:", map.mapElements.length)

    let space = await client.$transaction(async() => {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,
                creatorId: req.userId!,
                thumbnail: map.thumbnail,
            }
        })

        await client.spaceElements.createMany({
            data: map.mapElements.map(e => ({
                spaceId: space.id,
                elementId: e.elementId,
                x: e.x!,
                y: e.y!
            }))
        })

        return space;
    });

    console.log("[DEBUG] Created space (with map):", space);

    res.json({
        spaceId: space.id
    })

    

})

spaceRouter.delete("/element", userMiddleware, async(req, res) => {
    
    const parsedData = deleteElementSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({
            message: "Validation failed"
        })
        return
    }

    const spaceElement = await client.spaceElements.findFirst({
        where:{
            id: parsedData.data.id
        }, include: {
            space: true
        }
    })

    if(!spaceElement?.space.creatorId || spaceElement.space.creatorId !== req.userId){

        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }


    await client.spaceElements.delete({
        where: {
            id: parsedData.data.id
            
        }

    })

    res.json({
        message: "Element deleted"
    })

})


//DELETE THE SPACE
spaceRouter.delete("/:spaceId", userMiddleware, async(req, res) => {
    const space = await client.space.findUnique({
        where:{
            id: req.params.spaceId
        }, select: {
            creatorId: true
        }
    })

    if(!space){
        res.status(400).json({
            message: "Space not found"
        })
        return
    }
    if(space.creatorId !== req.userId){
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }

    await client.space.delete({
        where:{
            id: req.params.spaceId
        }
    })

    res.json({
        message: "Space deleted"
    })
})

spaceRouter.get("/all", userMiddleware, async (req, res) => {

    const spaces = await client.space.findMany({
        where: {
            creatorId: req.userId!
        }
    });
    res.json({
        spaces: (spaces).map(s => ({
            id: s.id,
            name: s.name,
            thumbnail: s.thumbnail,
            dimensions: `${s.width}x${s.height}`
        }))
    })
})

spaceRouter.post("/element", userMiddleware, async (req, res) => {

    const parsedData = AddElementSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({
            message: "Validation failed"
            
        })
       
        return
    }

    const space = await client.space.findUnique({
        where: {
            id: req.body.spaceId,
            creatorId: req.userId
        }, select: {
            width: true,
            height: true
        }
    })

    //TODO: Write a condition that check the given point is inside the boundary box or not
    if(req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!){
        res.status(400).json({
            message: "Point is outside of the boundary"
        })
        return
    }



    if(!space){
        res.status(400).json({ message: "Space not found"})
        return
    }

    await client.spaceElements.create({
        data: {
            spaceId: req.body.spaceId,
            elementId: req.body.elementId,
            x: req.body.x,
            y: req.body.y
        }
    })

    res.json({
        message: "Element Added"
    })
})

spaceRouter.delete("/element", userMiddleware, async(req, res) => {
    
    const parsedData = deleteElementSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({
            message: "Validation failed"
        })
        return
    }

    const spaceElement = await client.spaceElements.findFirst({
        where:{
            id: parsedData.data.id
        }, include: {
            space: true
        }
    })

    if(!spaceElement?.space.creatorId || spaceElement.space.creatorId !== req.userId){

        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }


    await client.spaceElements.delete({
        where: {
            id: parsedData.data.id
            
        }

    })

    res.json({
        message: "Element deleted"
    })

})

spaceRouter.get("/:spaceId", async(req, res) => {

    const space = await client.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        include: {
            elements: {
                include:{
                    element: true
                }
            }
        }
    })
    
    if(!space){
        res.status(400).json({
            message: "Space not found"
        })
        return;
    }

    res.json({
        "dimensions": `${space?.width}x${space?.height}`,
        elements: space?.elements.map(e => ({
            id: e.id,
            element: {
                id: e.element.id,
                imageUrl: e.element.imageUrl,
                width: e.element.width,
                height: e.element.height,
                static: e.element.static
            },
            x: e.x,
            y: e.y
        }))
    })
})

// Team invite routes
const InviteUserSchema = z.object({
  spaceId: z.string(),
  inviteeUsername: z.string(),
});

// Invite a user to a space
spaceRouter.post("/invite", async (req, res) => {
  try {
    const parsedData = InviteUserSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid data", details: parsedData.error });
    }

    const { spaceId, inviteeUsername } = parsedData.data;
    const inviterId = req.userId;

    if (!inviterId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Check if user owns the space
    const space = await client.space.findUnique({
      where: { id: spaceId },
    });

    if (!space || space.creatorId !== inviterId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Find the invitee by username
    const invitee = await client.user.findUnique({
      where: { username: inviteeUsername },
    });

    if (!invitee) {
      return res.status(404).json({ error: "User not found" });
    }

    if (invitee.id === inviterId) {
      return res.status(400).json({ error: "Cannot invite yourself" });
    }

    // Check if invite already exists
    const existingInvite = await client.spaceInvite.findUnique({
      where: {
        spaceId_inviteeId: {
          spaceId,
          inviteeId: invitee.id,
        },
      },
    });

    if (existingInvite) {
      return res.status(400).json({ error: "Invite already exists" });
    }

    // Create the invite
    const invite = await client.spaceInvite.create({
      data: {
        spaceId,
        inviterId,
        inviteeId: invitee.id,
      },
      include: {
        space: true,
        inviter: true,
        invitee: true,
      },
    });

    res.json(invite);
  } catch (error) {
    console.error("Error inviting user:", error);
    res.status(500).json({ error: "Failed to invite user" });
  }
});

// Accept/decline an invite
spaceRouter.put("/invite/:inviteId", async (req, res) => {
  try {
    const { inviteId } = req.params;
    const { status } = req.body; // 'ACCEPTED' or 'DECLINED'
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!['ACCEPTED', 'DECLINED'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const invite = await client.spaceInvite.findUnique({
      where: { id: inviteId },
    });

    if (!invite || invite.inviteeId !== userId) {
      return res.status(404).json({ error: "Invite not found" });
    }

    const updatedInvite = await client.spaceInvite.update({
      where: { id: inviteId },
      data: { status },
      include: {
        space: true,
        inviter: true,
        invitee: true,
      },
    });

    res.json(updatedInvite);
  } catch (error) {
    console.error("Error updating invite:", error);
    res.status(500).json({ error: "Failed to update invite" });
  }
});

// Get user's invites
spaceRouter.get("/invites/me", userMiddleware, async (req, res) => {
    console.log("Control Reached /invites/me")
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const invites = await client.spaceInvite.findMany({
      where: {
        inviteeId: userId,
        status: 'PENDING',
      },
      include: {
        space: true,
        inviter: true,
        invitee: true,
      },
    });

    res.json(invites);
  } catch (error) {
    console.error("Error fetching invites:", error);
    res.status(500).json({ error: "Failed to fetch invites" });
  }
});

export default spaceRouter;