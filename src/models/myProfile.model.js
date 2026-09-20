import mongoose from "mongoose";

// 1. Nested Education Sub-Schema to keep things modular
const EducationSchema = new mongoose.Schema({
    SchoolName: { 
        type: String, 
        required: true 
    },
    Degree: { 
        type: String, 
        required: true
    },
    FieldOfStudy: { 
        type: String, 
        required: true
    },
    StartDate: { 
        type: Date, 
        required: true 
    },
    EndDate: { 
        type: Date // Can be left empty if currently studying here
    },
    IsCurrent: { 
        type: Boolean, 
        default: false 
    }
}, { _id: true }); // Keep _id true so specific education blocks can be edited/deleted later

// 2. Core Basic Profile Schema
const ProfileSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Me', 
        required: true,
        unique: true 
    },

    portId: {
        type: String,
        required: true,
        unique: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    Headline: {
        type: String,
        required: true,
        trim: true 
    },
    CurrentTitle: {
        type: String,
        trim: true
    },
    CurrentCompany: {
        type: String,
        trim: true,
        default: "Freelance / Self-Employed"
    },
    Bio: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    YearsOfExperience: {
        type: Number,
        default: 0,
        min: [0]
    },
    LocationPreference: {
        type: String,
        enum: ["Remote", "On-site", "Hybrid", "Open to any"],
        default: "Open to any"
    },
    
    // Arrays for nested structures
    Education: [EducationSchema],
    
    Courses: [{
        CourseName: {
            type: String,
            required: true
        },
        Provider: {
            type: String,
            required: true
        }, 
        CompletionYear: {
            type: Number
        },
    }]
}, {
    timestamps: true 
});

export const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
