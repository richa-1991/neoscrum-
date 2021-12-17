const Feedbacks = require("../models/feedback");

const apiResponse = require("../helpers/apiResponse");

exports.userList = async (req, res) => {
    try {
        //Adding Pagination
        const { page = 1, limit = 3 } = req.query;

        const list = await Feedbacks.find({
            senderUid: req.params._id,
            comment: null,
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate(["senderUid", "receiverUid"]);
        const msg = list.length ? "Users found" : "Users not Found";

        return apiResponse.successResponseWithData(res, msg, list.length, list);
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
};
exports.feedbackSubmit = async (req, res) => {
    try {
        const data = {
            comment: req.body.comment,
            rate: req.body.rate,
        };
        console.log(data);
        await Feedbacks.findOneAndUpdate(
            { _id: req.body.id },
            { $set: data },
            { upsert: true }
        );

        const msg = "User feedback submitted successfully";
        //res.status(200).send(getStudent);
        return apiResponse.successResponse(res, msg);
    } catch (err) {
        // res.status(400).send(e);
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.feedbackRecieved = async (req, res) => {
    try {
        //Adding Pagination
        const { page = 1, limit = 3 } = req.query;

        const list = await Feedbacks.find({
            receiverUid: req.params._id,
            comment: { $ne: null },
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate(["senderUid", "receiverUid"]);
        const msg = list.length ? "Users found" : "Users not Found";

        return apiResponse.successResponseWithData(res, msg, list.length, list);
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
};
