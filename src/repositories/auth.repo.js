import {Me} from "../models/me.model.js";

export const createMe = async (userData) => {
    return await Me.create(userData);
};

export const getMyInfoById = async (UserId) => {
    return await Me.findById(UserId).select("-Password");
};

export const findMeByEmail = async (
    Email,
    
) => {

    return await Me.findOne({ Email });
};

export const findMeByEmailWithPassword = async (

    Email

) => {

    return await Me.findOne({

        Email,

    }).select("+Password");

};


export const updateMyPassword = async (

    user,

    hashedPassword

) => {

    user.Password = hashedPassword;

    await user.save();

};