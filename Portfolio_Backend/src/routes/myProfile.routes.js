import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
    myProfile
} from "../controllers/myProfile.controller.js"

const router = express.Router();

router.post(
    "/create",
    authenticate,
    myProfile
);

export default router;