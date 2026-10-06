import {Me} from "../models/me.model.js";

export const createMe = async (userData) => {
    return await Me.create(userData);
};


export const findMeByEmail = async (
    Email,
    
) => {

    return await Me.findOne({ Email });
};

export const findMeByEmailWithPassword = async (

    emailString

) => {

    return await Me.findOne({

        Email : emailString

    }).select("+Password");

};


export const updateMyPassword = async (

    user,

    hashedPassword

) => {

    user.Password = hashedPassword;

    await user.save();

};

export const updatePasswordReset = async (

    user,

    passwordReset

) => {

    user.passwordReset = passwordReset;

    await user.save();

    return user;

};

export const clearPasswordReset = async (

    user

) => {

    user.passwordReset = {

        otpHash: null,

        expiresAt: null,

        verified: false,

        createdAt: null,

    };

    await user.save();

    return user;

};

export const markPasswordResetVerified = async (

    user

) => {

    user.passwordReset.verified = true;

    await user.save();

    return user;

};