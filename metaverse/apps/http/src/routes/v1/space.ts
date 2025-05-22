import { Router } from "express";

export const spaceRouter = Router();

// the index.ts file handles /api/v1
// and /space is handled by routes/v1
spaceRouter.post("/", (req, res) => {

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