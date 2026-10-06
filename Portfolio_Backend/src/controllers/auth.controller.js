import {
    registerMe,
    loginMe,
    forgotPassword,
    verifyOtp,
    resetPassword,
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

export const forgotUserPassword = async (

    req,

    res,

    next

) => {

    try {

        const result =

            await forgotPassword(

                req.body

            );

        res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

export const verifyUserOtp = async (

    req,

    res,

    next

) => {

    try {

        const result =

            await verifyOtp(

                req.body

            );

        res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

export const resetUserPassword = async (

    req,

    res,

    next

) => {

    try {

        const result =

            await resetPassword(

                req.body

            );

        res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

export const logoutMe = async (

    req,
    res,
    next

) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
};
//test ci/cd