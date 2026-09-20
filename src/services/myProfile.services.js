import { BadRequestError } from "../errors/BadRequestError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import {
    createProfile,
    getMyInfoById,
    findMyProfileByUserId,
} from "../repositories/myProfile.repo.js"

import { myProfileSchema } from "../validators/myProfile.validator.js"
import { portfolioID } from "../utils/port.ID.js";



export const createMyProfile = async (
    UserId,
    body
) => {
    const {
        error,
        value,
    } = myProfileSchema.validate(body);

    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    /*
    const user = await getMyInfoById(UserId);

    if (!user) {
        throw new UnauthorizedError("User not found.");
    };
    */

    const userProfile = await findMyProfileByUserId(UserId);

    if (userProfile) {
        throw new BadRequestError("Profile already exists for this user.");
    };

    const myPortId = await portfolioID();

    const profileData = {
        UserId,
        portId : myPortId,
        ...value,
    };

    return await createProfile(profileData);

};