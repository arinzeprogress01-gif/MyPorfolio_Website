import jwt from "jsonwebtoken";

import {
    UnauthorizedError,
    NotFoundError
} from "../errors/index.js"

import {Me} from "../models/Me.model.js";

export const authenticate = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return next(
                new UnauthorizedError(
                    "Authentication required."
                )
            );

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.jwt_sec
        );

        const user = await Me.findById(decoded.id).select("-Password");

        if (!user) {

            return next(
                new NotFoundError(
                    "User not found."
                )
            );

        }

        req.user = user;

        next();

    } catch (error) {

        console.error("invalid or expired Token ", error.message);

        next(
            new NotFoundError(
                "Invalid or expired token."
            )
        );

    }

};