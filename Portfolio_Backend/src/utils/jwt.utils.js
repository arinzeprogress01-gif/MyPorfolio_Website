import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.jwt_sec,
        {
            expiresIn: process.env.jwt_exp || "7d"
        }
    );
};