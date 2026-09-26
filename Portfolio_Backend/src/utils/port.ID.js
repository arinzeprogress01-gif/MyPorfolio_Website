import { Profile } from "../models/myProfile.model.js";

export const portfolioID = async () => {

    const count = await Profile.countDocuments();

    const number = String(count + 1).padStart(5, "0");

    return `PORT-ID-${number}`;

};
