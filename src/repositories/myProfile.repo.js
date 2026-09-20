import { Profile } from "../models/myProfile.model.js"
import { Me } from "../models/me.model.js"


export const createProfile = async (profileData) => {

    const user = await Me.findById(profileData.userId);

    if (!user) {
        return null;
    }

    const myProfile = await Profile.create(profileData);

    user.profileCompleted = true;

    await user.save();

    return myProfile;
};


export const getMyInfoById = async (UserId) => {
    return await Me.findById(UserId).select("-Password");
};

export const findMyProfileByUserId = async (UserId) => {
    const myProfile =  await Profile.findOne(
        {
            userId: UserId
        }
    );

    return myProfile;
}

