import mongoose from "mongoose";


export const Database_connect = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is missing from environment variables");
        }

        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};