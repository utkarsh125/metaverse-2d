import client from "@metaverse/db/client"
import express from "express"
import { router } from "./routes/v1"

const app = express();

app.use("/api/v1", router)

app.use(express.json()) //-> need to do this for (req.body) parse

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Listening on PORT 3000")
})