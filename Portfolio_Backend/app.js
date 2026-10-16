
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/myProfile.routes.js";

import { notFound } from "./src/middlewares/not.found.middleware.js";
import { errorHandler } from "./src/middlewares/error.handler.middleware.js";

const app = express();

// Core middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Request logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log("Development mode: Morgan logging enabled.");
} else if (process.env.NODE_ENV === "production") {
    console.log("Production mode active.");
}

// Health and root endpoints
app.get("/", (req, res) => {
    res.status(200).send("The Portfolio Backend is running smoothly.");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is healthy",
    });
});

// Application routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Error handling must come after application routes
app.use(notFound);
app.use(errorHandler);

export default app;
