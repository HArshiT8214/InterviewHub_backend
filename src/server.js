import express from "express";
import cors from "cors";

import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";


import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";



const app = express()
// console.log(ENV.PORT)

app.use(express.json())
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()


app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);


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
