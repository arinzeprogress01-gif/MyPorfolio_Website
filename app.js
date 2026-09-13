import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express()
try {
    app.use(express.json());


    app.use(helmet());

    app.use(cors());

    if (process.env.NODE_ENV === "Development") {
        app.use(morgan("dev"));
    }

    app.get("/health", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Portfolio API is healthy"
        });
    });

    
} catch (error) {
    console.error("APP fault", error.message)
}

export default app;
