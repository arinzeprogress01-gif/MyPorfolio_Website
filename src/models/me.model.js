import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
        
    },

    Name: {
        type: String,
        required: true,
        trim: true,
    },

    Email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: [
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            "Please fill a valid email address , example: user@example.com"
        ],
    },

    Password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
        select: false,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            "password must contain at least 8 values with uppercase, lowercase and number"
        ]
    },

    Phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 11,
    },

    Gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others']
    },

    DateOfBirth: {
        type: Date,
        required: true,
    },

    Address: {
        Street : {
            type: String
        },
        City: {
            type: String
        },
        State: {
            type: String
        },
        Country : {
            type: String
        },
    },

},
    {
        timestamps: true,
    }
);

export const Me = mongoose.models.Me || mongoose.model("Me", mySchema);