import {
    createMyProfile
} from "../services/myProfile.services.js"

export const myProfile = async (
    req,
    res,
    next
) => {
    try {

        const profile = await createMyProfile(
            req.user._id,
            req.body)

        return res.status(204).json({
            success: true,
            
            message: " Profile created successfully",

            data: profile
        })
    } catch(error) {
        console.error(error.message)
        next(error)
    }
}
