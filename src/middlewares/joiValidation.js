const apiResponse = require("../helpers/apiResponse");


module.exports.validator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
         //console.log(error);
        if (error) {
            return apiResponse.validationError(
                res,
                error.details[0].message
            );
        }

        return next();
    };
};