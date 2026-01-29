import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";

const app = express()
// console.log(ENV.PORT)

app.use(express.json())
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
    res.status(200).json({ msg: "api is up and running" })
})


const startServer = async () => {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log(`server is running on port ${ENV.PORT}`)
        });
    } catch (error) {
        console.log("❌Error in starting the server", error)
    }
};
startServer();