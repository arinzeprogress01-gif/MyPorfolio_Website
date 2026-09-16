import express from "express";

import {
    RegisterMe,
    LoginMe
 } from "../controllers/auth.controller.js"

//import { authenticate } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post(
    "/register",
    RegisterMe,
);

router.post(
    "/login",
    LoginMe,
)

export default router;