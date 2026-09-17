import Joi from "joi";
import {
    passwordRegex,
    emailRegex
} from "../constants/regex.js";



export const resetPasswordSchema = Joi.object({

    Email: Joi.string()
        .pattern(emailRegex)
        .email()
        .required(),

    newPassword: Joi.string()
        .pattern(passwordRegex)
        .required()
        .min(8)
        .messages({
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long.",
        }),

    confirmNewPassword: Joi.any()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({
            "any.only": "Passwords do not match.",
        }),

});