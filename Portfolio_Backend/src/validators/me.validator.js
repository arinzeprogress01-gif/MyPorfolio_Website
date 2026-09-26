import Joi from "joi";
import { passwordRegex, emailRegex } from "../constants/regex.js";

export const meSchema = Joi.object({
    Name: Joi.string().required().trim(),

    Email: Joi.string().pattern(emailRegex).required().trim().lowercase(),

    Password: Joi.string().min(8).pattern(passwordRegex).required(),

    Phone: Joi.string().trim().min(11).required(),

    Gender: Joi.string()

        .valid(

            "male",

            "female",

            "others"

        )

        .required(),

    DateOfBirth: Joi.date().required(),

    Address: {
        Street: Joi.string().trim().required(),

        City: Joi.string().trim().required(),

        State: Joi.string().trim().required(),
        
        Country: Joi.string().trim().required(),

    }

});          