import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js"; 

/**
 * Signs a JWT and injects it directly into an HTTP-Only response cookie wrapper.
 * @param {Object} res - Express response object
 * @param {Object} userPayload - Data to embed in the token (e.g., { id, role })
 */


export const setTokenCookie = (res, userPayload) => {
    if (!process.env.jwt_sec) {
        throw new Error("JWT_SECRET is missing from environment variables.");
    }

    // 1. Generate the signed JWT token string
    const token = jwt.sign(userPayload, process.env.jwt_sec, {
        expiresIn: "1d", // Set token expiration to match cookie maxAge lifecycle
    });

    // 2. Attach the token directly to the Express response stream cookies collection
    res.cookie("token", token, {
        httpOnly: true, // Complete isolation from client-side script contexts (XSS block)
        secure: process.env.MY_NODE_ENV === "production", // Forces HTTPS bindings on live environments like Render
        sameSite: "strict", // Keeps cookies tracking locked strictly to your application realm (CSRF shield)
        maxAge: 24 * 60 * 60 * 1000, // 24 hours conversion footprint in milliseconds
    });

    return token;
};

/**
 * Validates a token string pulled from a request cookie.
 * @param {string} token - The raw token string from req.cookies.token
 * @returns {Object} Unpacked token payload data (e.g., user id and role)
 */
export const verifyIncomingToken = (token) => {
    if (!token) {
        throw new UnauthorizedError("Authentication token is missing. Please log in.");
    };

    try {
        // Decode and verify structure integrity against local environment secret hashes
        const decodedPayload = jwt.verify(token, process.env.jwt_sec);
        return decodedPayload;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        // Automatically handle expired tokens or altered signatures gracefully
        throw new UnauthorizedError("Session expired or token invalid. Access denied.");
    }
};
