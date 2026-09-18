import express from "express";

import {
    RegisterMe,
    LoginMe,
    resetUserPassword,
    logoutMe
} from "../controllers/auth.controller.js"
 
import { authenticate } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post(
    "/register",
    RegisterMe,
);

router.post(
    "/login",
    LoginMe,
);

router.post(
    "/reset-password",
    resetUserPassword
);

router.post(
    "/logout",
    authenticate,
    logoutMe
);
export default router;