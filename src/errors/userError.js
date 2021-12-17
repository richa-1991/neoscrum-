const { body, validationResult } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");

const validator = () => {
    return [
        body("email")
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email should be proper way"),
        body("user_name")
            .not()
            .isAlphanumeric()
            .withMessage("Name must be character only")
            .isLength({ min: 10 })
            .withMessage("Name must contain 10 charater"),
    ];
};

const messages = (req, res, next) => {
    const validator = validationResult(req);

    if (validator.isEmpty()) {
        return next();
    }

    if (!validator.isEmpty()) {
        return apiResponse.validationError(res, validator.errors[0]["msg"], []);
    }
};

module.exports = {
    validator,
    messages,
};
