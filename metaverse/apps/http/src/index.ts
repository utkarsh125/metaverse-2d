import client from "@metaverse/db/client"
import cors from "cors";
import express from "express"
import { router } from "./routes/v1"

const app = express();

//TODO: Remove this later
app.use(
    cors({
        origin: 'http://localhost:3001'
    })
)

app.use(express.json()) //-> need to do this for (req.body) parse

app.use("/api/v1", router)


app.listen(process.env.PORT || 3000, ()=> {
    console.log("Listening on PORT 3000")
})