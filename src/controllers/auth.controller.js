import { registerMe } from "../services/auth.services.js";

export const RegisterMe = async(
    req,
    res,
    next
) => {
    try {

        const regData = await registerMe (req.body);

        return res.status(201).json({
            success: true,
            message: "Registration id successful.",
            data: regData,
        });

    } catch (error) {
        next(error);
    }
}