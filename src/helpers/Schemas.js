const Joi = require("joi");

// const BaseJoi = require("joi");
// const ImageExtension = require("joi-image-extension");

//const Joi = BaseJoi.extend(ImageExtension)

const Schemas = {
    login: Joi.object().keys({
        email: Joi.string().email().lowercase().required().messages({
            "string.base": "Email should be string",
            "string.email": "Email should be in format.",
            "string.lowercase": "Email sholud be in lowercase",
            "any.required": "Email is required",
        }),
        password: Joi.string().min(3).required().empty().messages({
            "string.base": "Password should be string",
            "string.min": "Password must contain 3 characters.",
            "string.empty": "Password shouldn't be blank.",
            "any.required": "Password is required",
        }),
    }),
    addUser: Joi.object().keys({
        user_name: Joi.string().empty().min(3).required().messages({
            "string.base": "Name should be string",
            "string.empty": "Name must not to be blank.",
            "string.min": "Name must contain 3 characters.",
            "any.required": "Name is required",
        }),
        email: Joi.string().email().lowercase().required().messages({
            "string.base": "Email should be string",
            "string.email": "Email should be in format.",
            "string.lowercase": "Email sholud be in lowercase",
            "any.required": "Email is required",
        }),
        password: Joi.string()
            //.pattern(new RegExp("^[a-zA-Z0-9]{3,10}$"))
            .min(6)
            .required()
            .messages({
                "string.base": "Password should be string",
                "string.min": "Password must contain 6 characters.",
                "any.required": "Password is required",
            }),
        // profile_image: Joi.number().required().messages({
        //     "any.required": "Image is required..",
        // }),
        // profile_image:Joi.image().allowTypes('jpg')
    }),

    postComment: Joi.object().keys({
        id: Joi.string().empty().messages({
            "string.base": "ID should be string",
            "string.empty": "ID must not to be blank.",
            
        }),
        rate: Joi.number().empty().messages({
            "number.base": "rate should be string",
            "string.empty": "rate must not to be blank.",
            
        }),
        comment: Joi.string().empty().min(10).messages({
            "string.base": "Comment should be string",
            "string.empty": "Comment must not to be blank.",
            "string.min": "Name must contain 10 characters.",
        }),
    }),
};

module.exports = Schemas;
