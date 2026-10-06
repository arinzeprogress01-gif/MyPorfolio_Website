import Joi from "joi";
import {
    emailRegex
} from "../constants/regex.js";

export const verifyOtpSchema = Joi.object({

    email: Joi.string()

        .pattern(emailRegex)

        .email()

        .required(),

    otp: Joi.string()

        .length(6)

        .required()

        .pattern(/^\d+$/)

        .messages({

            "string.length":

                "OTP must contain 6 digits.",

        }),

});
