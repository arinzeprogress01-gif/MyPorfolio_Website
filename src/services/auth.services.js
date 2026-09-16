import {
    createMe,
    //getMyInfoById,
    findMeByEmail,
    //findMeByEmailWithPassword,
    //updateMyPassword
} from "../repositories/auth.repo.js"

import { 
    BadRequestError,
    ConflictError,
    //UnauthorizedError,
    //ForbiddenError,
    //NotFoundError
} from "../errors/index.js"

import { hashPassword } from "../utils/Password.utils.js"
import { generateToken } from "../utils/jwt.utils.js";


export const registerMe = async (
    UserId,
    payload
) => {
    const {
        Name,
        Email,
        Password,
        confirmPassword,
        Phone,
        Gender,
        DateOfBirth,
        Street,
        City,
        State,
        Country,
    } = payload;

    if (!Name) {
        throw new BadRequestError("Full name is required.");
    }

    if (!Email) {
        throw new BadRequestError("Email is required.");
    }

    if (!Password || Password.length < 8) {
        throw new BadRequestError("Password must contain at least 8 characters.");
    }

    if (Password !== confirmPassword) {
        throw new BadRequestError("Passwords do not match.");
    }

    if (!Gender) {
        throw new BadRequestError("Provide your Gender");
    }

    if (!DateOfBirth) {
        throw new BadRequestError("Date of birth is required");
    }

    if (!Street ||
        !City ||
        !State ||
        !Country) {
        throw new BadRequestError("Complete Address Required");
    }

    
    const existingUser = await findMeByEmail(Email);
    if (existingUser) {
        throw new ConflictError("Email already exists.");
    }

    
    const hashedPassword = await hashPassword(Password);

    const user = await createMe({
        UserId,
        Name,
        Email,
        Password: hashedPassword,
        Phone,
        Gender,
        Address: {
            Street,
            City,
            State,
            Country,
        },
        DateOfBirth,

    });

    const token = generateToken({
        UserId: user.UserId,
        Email: user.Email,
        Password: user.Password,
    });

    return {
        user: {
            UserId: user.UserId,
            Name: user.Name,
            Email: user.Email,
            Phone: user.Phone,
            Gender: user.Gender,
            Address: {
                Street: user.Street,
                City: user.City,
                State: user.State,
                Country: user.Country,
            },
            DateOfBirth : user.DateOfBirth,

        },
        token,
    };
};
