import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./src/routes/auth.routes.js"
import profileRoutes from "./src/routes/myProfile.routes.js"

import { notFound } from "./src/middlewares/not.found.middleware.js"
import { errorHandler } from "./src/middlewares/error.handler.middleware.js"
const app = express()
try {
    app.use(express.json());

    app.use(helmet());

    app.use(cors());

    if (process.env.NODE_ENV === "development") {
    try {
        // Only run morgan if it is actively installed in the local environment modules footprint
        const morgan = (await import("morgan")).default;
        app.use(morgan("dev"));
    } catch (error) {
        console.error(error.message,"⚠️ Morgan is not installed, skipping logging middleware execution tracking.");
    }
}

    
    app.get("/", (req, res) => {
        res.status(200).send("Portfolio Backend is running smoothly.");
    });

    app.get("/health", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Portfolio API is healthy"
        });
    });

    app.use("/auth", authRoutes)
    app.use("/profile", profileRoutes);

    app.use(notFound)
    app.use(errorHandler)
    
} catch (error) {
    console.error("APP fault", error.message)
}

export default app;
