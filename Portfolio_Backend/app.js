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

    // Check for development environment
    if (process.env.NODE_ENV === "development") {
        try {
            // Dynamic import protects your production build if devDependencies are pruned
            const morgan = (await import("morgan")).default;
            app.use(morgan("dev"));
            console.log("🛠️  Development mode: Morgan logging middleware enabled.");
        } catch (error) {
            console.warn(error.message, "⚠️ Morgan is missing from node_modules, skipping request logs.");
        }

        // 💡 Added: Explicit check for production mode
    } else if (process.env.NODE_ENV === "production") {
        console.log("🚀 Production mode active: Security protocols and clean logging enforced.");

        // You can put production-only middleware here if needed, such as trust proxy limits:
        // app.set('trust proxy', 1);

        // Fallback protection case if NODE_ENV is misspelled, blank, or completely omitted
    } else {
        console.warn(`⚠️ Warning: Unknown NODE_ENV value: "${process.env.NODE_ENV}". Defaulting to safe settings.`);
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
