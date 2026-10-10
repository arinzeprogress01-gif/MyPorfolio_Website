import { Env_connect } from "./config/env.js";
import { Database_connect } from "./config/db.js";
import app from "./app.js";

// Top level exception catchers to FORCE a log if something breaks natively
process.on("uncaughtException", (err) => {
    console.error("CRITICAL UNCAUGHT EXCEPTION:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("CRITICAL UNHANDLED REJECTION AT:", promise, "REASON:", reason);
    process.exit(1);
});

// Load environment variables immediately
Env_connect();

// Render injects port 10000 automatically, but this catches it seamlessly
const PORT = process.env.PORT || 10000;

const startServer = async () => {
    console.log("Starting backend portfolio boot sequence...");
    
    await Database_connect();

    // Streamlined: Removed "0.0.0.0" to let Render's internal proxy handle the handshake
    app.listen(PORT, () => {
        console.log(`🚀 Server successfully running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
});
