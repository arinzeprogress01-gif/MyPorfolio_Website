import {
    createMe,
    findMeByEmail,
    findMeByEmailWithPassword,
    updateMyPassword,
    updatePasswordReset,
    markPasswordResetVerified,
    clearPasswordReset
} from "../repositories/auth.repo.js"

import { 
    BadRequestError,
    ConflictError,
    UnauthorizedError,
    //ForbiddenError,
    //NotFoundError
} from "../errors/index.js"

import {forgotPasswordSchema} from "../validators/forgotPassword.validator.js"
import {verifyOtpSchema} from "../validators/verifyOtp.js"
import { resetPasswordSchema } from "../validators/resetPassword.js"

import { hashPassword , comparePassword} from "../utils/Password.utils.js"
import { generateToken } from "../utils/jwt.utils.js";
import {generateOTP} from "../utils/generateOtp.js"
import {
    hashOtp, 
    compareOtp
} from "../utils/hashOtp.js"


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

export const forgotPassword = async (

    body

) => {

    const { error, value } =

        forgotPasswordSchema.validate(body);

    if (error) {

        throw new BadRequestError(

            error.details[0].message

        );

    }

    const { Email } = value;

    const user = await findMeByEmail(

        Email,

        true

    );

    /*
        Do not reveal whether
        the email exists.
    */

    if (!user) {

        return {

            message:
                "If an account exists, an OTP has been sent.",

        };

    }

    const otp = generateOTP();

    const otpHash = hashOtp(

        otp

    );

    await updatePasswordReset(

        user,

        {

            otpHash,

            expiresAt:

                new Date(

                    Date.now() +

                    5 * 60 * 1000

                ),

            verified: false,

            createdAt: new Date(),

        }

    );


    return {

        otp,

        message:
            "If an account exists, an OTP has been sent.",

    };

};

export const verifyOtp = async (

    body

) => {

    const { error, value } =

        verifyOtpSchema.validate(body);

    if (error) {

        throw new BadRequestError(

            error.details[0].message

        );

    }

    const {

        Email,

        otp,

    } = value;

    const user =

        await findMeByEmail(

            Email,

            true

        );

    if (!user) {

        throw new UnauthorizedError(

            "Invalid OTP."

        );

    }

    const valid =

        compareOtp(

            otp,

            user.passwordReset.otpHash


        );

    if (!valid) {

        throw new UnauthorizedError(

            "Invalid OTP."

        );

    };

    if (

        !user.passwordReset.otpHash

    ) {

        throw new UnauthorizedError(

            "OTP has not been generated."

        );

    }

    if (

        user.passwordReset.expiresAt <

        new Date()

    ) {

        throw new UnauthorizedError(

            "OTP has expired."

        );

    }


    await markPasswordResetVerified(

        user

    );

    return {

        message: "OTP verified successfully.",

        Email: user.Email,

    };

};

export const resetPassword = async (

    body

) => {

    const { error, value } =

        resetPasswordSchema.validate(body);

    if (error) {

        throw new BadRequestError(

            error.details[0].message

        );

    }

    const {

        newPassword,
        comfirmNewPassword

    } = value;

    const Email = body.Email;

    if (!Email) {

        throw new UnauthorizedError(
            "Reset session expired."
        );

    }

    const user = await findMeByEmail(
        Email,
        true
    );

    if (!user) {

        throw new UnauthorizedError(

            "Invalid request."

        );

    };

    if (newPassword !== comfirmNewPassword) {
        throw new BadRequestError("Passwords do not match")
    }

    if (

        !user.passwordReset.verified

    ) {

        throw new UnauthorizedError(

            "OTP verification is required."

        );

    }

    const hashedPassword =

        hashPassword(

            newPassword

        );

    await updateMyPassword(

        user,

        hashedPassword

    );

    await clearPasswordReset(

        user

    );


    return {

        message:

            "Password reset successfully.",

    };

};