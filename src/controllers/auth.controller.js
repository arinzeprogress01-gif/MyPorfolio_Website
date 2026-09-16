import {
    registerMe,
    loginMe,
 } from "../services/auth.services.js";

export const RegisterMe = async(
    req,
    res,
    next
) => {
    try {

        const regData = await registerMe(
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Registration is successful.",
            data: regData,
        });

    } catch (error) {
        next(error);
    }
};

export const LoginMe = async (
    req,
    res,
    next
) => {
    try {
        const loginData = await loginMe(
            req.body
        );
        return res.status(200).json({
            success: true,
            message: "Login Is Successful",
            data: loginData,
        })
    } catch (error) {
        next(error);
    }
};
