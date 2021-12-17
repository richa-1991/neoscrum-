const apiResponse = require('./apiResponse')
module.exports.single = (req, res, key = "") => {
    try {
        if (req.files && req.files[key]) {
            const file = req.files[key];
            file.name = Date.now() + "." + file.name.split(".").pop();
            file.mv("./public/uploads/" + file.name);

            return file.name;
        } else {
            return null;
        }
    } catch (err) {
        return apiResponse.validationError(res, 'Error to upload image');
    }
};