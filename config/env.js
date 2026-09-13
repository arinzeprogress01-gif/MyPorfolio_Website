import dotenv from "dotenv";

export const Env_connect = () => {
    try {
        dotenv.config();
    } catch (error) {
        console.error("Connection to env variables Failed", error.message)
    }
};