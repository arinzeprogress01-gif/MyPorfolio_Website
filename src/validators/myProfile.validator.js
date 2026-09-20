import Joi from "joi"

export const myProfileSchema = Joi.object({
    SchoolName: Joi.string()
        .trim()
        .required(),
    
    Degree: Joi.string()
        .required(),
    
    FieldOfStudy: Joi.string()
        .required(),
    
    StartDate: Joi.date()
        .required(),
    
    isCurrent: Joi.boolean()
        .default(false),
    
    EndDate: Joi.when("isCurrent" ,{
        is: true,
        then: Joi.date().allow(null),
        otherwise: Joi.date().required()
    }),
    
    Headline: Joi.string()
        .required()
        .trim(),
    
    imageUrl: Joi.string()
        .uri()
    .required(),
    
    CurrentTitle: Joi.string()
        .trim(),
    
    CurrentCompany: Joi.string()
        .trim(true)
        .default("Freelance / Self-Employed"),

    Bio: Joi.string()
        .required()
        .max(500)
        .trim(true),

    YearsOfExperience: Joi.number()
        .default(0)
    .min(0),
        
    LocationPreference: Joi.string()
        .valid(
            "Remote",
            "On-site",
            "Hybrid",
            "Open to any"
    )
    .default("Open to any"),

    // Changed from a single object to an array of objects
    Courses: Joi.array()
        .items(
            Joi.object({
                CourseName: Joi.string()
                    .required(),
                Provider: Joi.string()
                    .required(),
                CompletionYear: Joi.number()
            })
        )
        .default([]) // Defaults to an empty array if no courses are provided


})