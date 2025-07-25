import client from "@metaverse/db/client"
import cors from "cors";
import express from "express"
import { router } from "./routes/v1"

const app = express();

//TODO: Remove this later
app.use(
    cors({
        origin: [
            'http://localhost:3001',
            //Add more according to your needs
            //ultimately it should be the same as the frontend url
        ]
    })
)

app.use(express.json()) //-> need to do this for (req.body) parse

// Health check endpoint for Railway
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/v1", router)

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening on PORT ${port}`)
})