import { CreateAvatarSchema, CreateElementSchema, CreateMapSchema, UpdateElementSchema } from "../../types";

import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin";
import client from "@metaverse/db/client";

export const adminRouter = Router();
adminRouter.use(adminMiddleware);

//The admin endpoint has four routes
// /api/v1/space

adminRouter.post("/element", async (req, res) => {
  // console.log("👉 POST /admin/element body:", req.body)
  try {
    const parsedData = CreateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(403).json({ message: "Validation failed" });
      return;
    }

    const element = await client.element.create({
      data: {
        width: parsedData.data.width,
        height: parsedData.data.height,
        static: parsedData.data.static,
        imageUrl: parsedData.data.imageUrl,
      },
    });

    res.status(200).json({ id: element.id });
  } catch (err) {
    // console.error("POST /element error:", err);
    res.status(403).json({ message: "Internal server error" });
  }
});

// adminRouter.put("/element/:elementId", async (req, res) => {
//   try {
//     const parsedData = UpdateElementSchema.safeParse(req.body);
//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation failed" });
//       return;
//     }

//     const elementId = parseInt(req.params.elementId, 10);
//     if (Number.isNaN(elementId)) {
//       res.status(400).json({ message: "Invalid elementId" });
//       return;
//     }

//     await client.element.update({
//       where: { id: elementId },
//       data: { imageUrl: parsedData.data.imageUrl },
//     });

//     res.json({ message: "Element updated" });
//   } catch (err) {
//     console.error("PUT /element/:elementId error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


adminRouter.put("/element/:elementId", async (req, res) => {
  try {
    const parsedData = UpdateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(403).json({ message: "Validation failed" });
      return;
    }

    // keep it as a string
    const elementId = req.params.elementId;

    await client.element.update({
      where: { id: elementId },
      data: { imageUrl: parsedData.data.imageUrl },
    });

    res.json({ message: "Element updated" });
  } catch (err) {
    // console.error("PUT /element/:elementId error:", err);
    res.status(403).json({ message: "Internal server error" });
  }
});


//The metadata issue was here but is now working.
adminRouter.post("/avatar", async (req, res) => {
  try {
    const parsedData = CreateAvatarSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(403).json({ message: "Validation failed" });
      return;
    }

    const avatar = await client.avatar.create({
      data: {
        name: parsedData.data.name,
        imageUrl: parsedData.data.imageUrl,
      },
    });

    res.status(200).json({ avatarId: avatar.id });
  } catch (err) {
    // console.error("POST /avatar error:", err);
    res.status(403).json({ message: "Internal server error" });
  }
});

adminRouter.post("/map", async (req, res) => {
  try {
    const parsedData = CreateMapSchema.safeParse(req.body);

    if (!parsedData.success) {
      console.log("Admin Endpoint /map: ", parsedData);
      res.status(403).json({ message: "Validation failed" });
      return;
    }

    const [width, height] = parsedData.data.dimensions
      .split("x")
      .map((v) => parseInt(v, 10));
    if (Number.isNaN(width) || Number.isNaN(height)) {
      res.status(403).json({ message: "Invalid dimensions format" });
      return;
    }

    const map = await client.map.create({
      data: {
        name: parsedData.data.name,
        width,
        height,
        thumbnail: parsedData.data.thumbnail,
        tiledMapFile: parsedData.data.tiledMapFile,
        mapElements: {
          create: parsedData.data.defaultElements.map((e) => ({
            elementId: e.elementId,
            x: e.x,
            y: e.y,
          })),
        },
      },
    });

    res.status(200).json({ id: map.id });
  } catch (err) {
    // console.error("POST /map error:", err);
    res.status(403).json({ message: "Internal server error" });
  }
});
