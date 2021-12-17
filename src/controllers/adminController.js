"use strict";
const Users = require("../models/user");
const Feedbacks = require("../models/feedback");

const apiResponse = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const upload = require("../helpers/imageFileupload");

exports.addUser = async (req, res) => {
    try {
        let msg = "User added successfully";
        const userCount = await Users.countDocuments({ email: req.body.email });
        if (userCount) {
            msg = "Email Already Exists";
            return apiResponse.validationError(res, msg);
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.profile_image =
            (await upload.single(req, res, "profile_image")) || null;

        const createUser = await new Users(req.body).save();

        return apiResponse.successResponseWithData(res, msg, createUser);
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.assignUsers = async (req, res) => {
    try {
        let msg = "User Assigned successfully";
        const date = new Date();
        const newDate = date.getMonth() + 1 + "-" + date.getFullYear();
        const feebackCount = await Feedbacks.countDocuments({ date: newDate });
        if (feebackCount) {
            msg = "User Already Assigned";
            return apiResponse.successResponseWithData(res, msg);
        }

        const getAllUsers = await Users.find({ is_admin: false });
        if (getAllUsers < 5) {
            const msg = "Atleast add four users";
            return apiResponse.successResponseWithData(res, msg);
        }

        const getAllUsersIds = getAllUsers.map((value) => {
            return value._id;
        });

        for (let i = 0; i < getAllUsersIds.length; i++) {
            const voluntierUserId = getAllUsersIds[i];

            let temp = getAllUsersIds.filter((e) => e !== voluntierUserId);

            const selectedIds = getRandom(temp, 3);
            temp = getAllUsersIds;

            for (let j = 0; j < selectedIds.length; j++) {
                const assignedUsers = {
                    senderUid: voluntierUserId,
                    receiverUid: selectedIds[j],
                    date: newDate,
                };

                await new Feedbacks(assignedUsers).save();
            }
        }

        return apiResponse.successResponseWithData(res, msg);
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
};

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
