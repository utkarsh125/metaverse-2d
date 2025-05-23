import client from "@metaverse/db/client"
import express from "express"
import { router } from "./routes/v1"

const app = express();

app.use("/api/v1", router)


app.listen(process.env.PORT || 3000, ()=> {
    console.log("Listening on PORT 3000")
})