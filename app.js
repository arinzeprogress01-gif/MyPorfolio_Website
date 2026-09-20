import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./src/routes/auth.routes.js"
import profileRoutes from "./src/routes/myProfile.routes.js"

import { notFound } from "./src/middlewares/not.found.middleware.js"
import { errorHandler } from "./src/middlewares/error.handler.middleware.js"
const app = express()
try {
    app.use(express.json());

    app.use(helmet());

    app.use(cors());

    if (process.env.NODE_ENV === "Development") {
        app.use(morgan("dev"));
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
