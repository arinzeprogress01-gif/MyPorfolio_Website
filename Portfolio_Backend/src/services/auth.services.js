import {
    createMe,
    findMeByEmail,
    findMeByEmailWithPassword,
    updateMyPassword
} from "../repositories/auth.repo.js"

import { 
    BadRequestError,
    ConflictError,
    UnauthorizedError,
    //ForbiddenError,
    //NotFoundError
} from "../errors/index.js"

import {resetPasswordSchema} from "../validators/resetPassword.validator.js"

import { hashPassword , comparePassword} from "../utils/Password.utils.js"
import { generateToken } from "../utils/jwt.utils.js";


export const registerMe = async (
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
        Id: user._id,
        Email: user.Email,
        Password: user.Password,
    });

    return {
        user: {
            Id: user._id,
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


export const loginMe = async (loginData) => {

    const {
        Email,
        Password
    } = loginData;
    
    if (!Email) {
        throw new BadRequestError("Email is required.");
    };

    if (!Password) {
        throw new BadRequestError("Password is required.");
    }

    const user = await findMeByEmailWithPassword(Email);

    if (!user) {
        throw new UnauthorizedError ("user is non-existent");
    };

    if (!user.Password) {
        throw new UnauthorizedError("Password is not set for this user.");
    };

    const isPasswordValid = await comparePassword(Password, user.Password);
    if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid password.");
    }

    const token = generateToken({
        userId : user._id,
        Email: user.Email,
    });

    // 1. Convert the Mongoose document to a plain JavaScript object
    const userObject = user.toObject();

    delete userObject.Password;
    // 2. Remove the password field from the object
    
    // 3. Return the sanitized data payload cleanly
    return {
        user: userObject,
        token,
    };

};

export const resetPassword = async (body) => {

    const {
        error,
        value
    } = resetPasswordSchema.validate(body);

    if (error) {
        error.details[0].message;
    };

    const {
        Email,
        newPassword,
        confirmNewPassword
    } = value;

    const user = await findMeByEmail(
        Email,
        true
    );
    if (!user) {
        throw new UnauthorizedError("User Doesn't Exist");
    }

    if (newPassword != confirmNewPassword) {
        throw new BadRequestError("Passwords do not match.");
    };

    const hashedPassword = await hashPassword(newPassword);
    
    await updateMyPassword (
        user,

        hashedPassword
    );

    return {
        Email: user.Email,
        Address: user.Address,
        message: "Password reset successful"
    };

};    