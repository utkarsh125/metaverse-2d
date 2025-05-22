// this is going to export our root router

import { Router } from "express";
import { adminRouter } from "./admin";
import { spaceRouter } from "./space";
import { userRouter } from "./user";

//any time a request comes to "/api/v1" it will be handled by this router

export const router = Router();

router.post("/signup", (req, res) => {
    res.json({
        message: "Signup"
    })
})

router.post("/signin", (req, res) => {
    res.json({
        message: "Signin"
    })
})


router.get("/elements", (req, res) => {

})

router.get("/avatars", (req, res) => {
    
})

// any request that starts with /user will be handled by userRouter
router.use("/user", userRouter)
// any request that starts with /space will be handled by spaceRouter
router.use("/space", spaceRouter)
// any request that starts with /admin will be handled by adminRouter
router.use("/admin", adminRouter)