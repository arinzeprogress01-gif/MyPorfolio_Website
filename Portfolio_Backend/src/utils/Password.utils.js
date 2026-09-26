import bcrypt from "bcrypt";

import {SALT_ROUNDS} from "../constants/security.constant.js"

export const hashPassword = async (Password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(Password, salt);
};

export const comparePassword = async (
    Password,
    hashedPassword
) => {
    return bcrypt.compare(Password, hashedPassword);
};

