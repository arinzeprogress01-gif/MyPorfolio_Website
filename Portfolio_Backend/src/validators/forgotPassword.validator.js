import Joi from "joi";
import {
    emailRegex
} from "../constants/regex.js";



export const forgotPasswordSchema = Joi.object({

    Email: Joi.string()
        .pattern(emailRegex)
        .email()
        .required(),
});