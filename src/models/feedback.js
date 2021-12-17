



"use strict";

const mongoose = require("mongoose");

module.exports = mongoose.model(
    "Feedback",
    new mongoose.Schema(
        {
            senderUid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                alias: "sender",
                required: true,
            },
            receiverUid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                alias: "receiver",
                required: true,
            },
            comment: {
                type: String,
                default: null,
            },
            rate: {
                type: Number,
                default: null,
            },
            date: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: true,
            versionKey: false,
            toJSON: {
                transform(doc, ret) {
                    delete ret.id;
                    delete ret.senderUid;
                    delete ret.receiverUid;
                    delete ret.createdAt;
                    delete ret.updatedAt;
                },
                getters: true,
            },
        },
    ),
);

