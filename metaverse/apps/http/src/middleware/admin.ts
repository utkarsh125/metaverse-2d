//user is not sending me an id
//the user is sending me a header

import { NextFunction, Request, Response } from "express";

import { JWT_PASSWORD } from "../config";
//so creating a middleware kinda helps us with that
import jwt from "jsonwebtoken";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization // Bearer token
    const token = header?.split(" ")[1];//fetch the token

    if(!token){
        res.status(401).json({
            message: "Unauthorized"
        })
        return

    }

    //if the user exists in the header
    //then verify the jwt

    // console.log("[adminMiddleware", req.method, req.originalUrl, "auth:", req.headers.authorization);

    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as { role:string, userId: string}

        if(decoded.role !== "Admin"){
            res.status(403).json({
                message: "Unauthorized"
            })
            return;
        }
        req.userId = decoded.userId
        next()

        
    } catch (error) {
        // console.log(" adminMiddleware threw:", error)
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }

}