

"use strict";

const mongoose = require("mongoose");

module.exports = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            user_name: {
                type: String,
                trim: true,
                required: true,
            },
            email: {
                type: String,
                trim: true,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            profile_image: {
                type: String,
                required: true,
                get: imageURL,
            },
            is_admin: {
                type: Boolean,
                default: false,
            },
            token: {
                type: String,
            },
        },
        {
            timestamps: true,
            versionKey: false,
            toJSON: {
                transform(doc, ret) {
                    delete ret.password;
                    delete ret.id;
                    delete ret.createdAt;
                    delete ret.updatedAt;
                },
                getters: true,
            },
        },
    ),
);

function imageURL(image) {
    return `${process.env.IMAGE_URL}${image}`;
}

