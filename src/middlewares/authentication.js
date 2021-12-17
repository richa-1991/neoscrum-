const apiResponse = require("../helpers/apiResponse");
module.exports.isAdmin = (req, res, next) => {
    try {
        if (req.params.is_admin) {
            return next();
        }
        return apiResponse.unauthorizedResponse(res, "Access denied");
    } catch (err) {
        return apiResponse.validationError(res,err)
        
    }

};

module.exports.isUser = (req, res, next) => {
    try {
        if (req.params.is_admin) {
          
            return apiResponse.unauthorizedResponse(res, "Access denied");
        }
        return next();
     
    } catch (err) {
        return apiResponse.validationError(res,err)
        
    }

};
