import { Profile } from "../models/myProfile.model.js"
import { Me } from "../models/me.model.js"


export const createProfile = async (UserId, profileData) => {

    const user = await Me.findById(UserId);

    const myProfile = await Profile.create(profileData);

    user.profileCompleted = true;

    await user.save();

    return myProfile;
};


export const getMyInfoById = async (UserId) => {
    return await Profile.findById(UserId).select("-Password");
};

export const findMyProfileByUserId = async (UserId) => {
    const myProfile =  await Profile.findOne(
        {
            UserId
        }
    );

    return myProfile;
}

