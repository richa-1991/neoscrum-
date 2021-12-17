const Users = require("../models/user");

const apiResponse = require("../helpers/apiResponse");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    try {
        // Get user input

        const { email, password } = req.body;
        const user = await Users.findOne({ email: email });

        const msg = "User Found Successfully";
        // compare
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { _id: user._id, is_admin: user.is_admin },
                process.env.PRIMARY_KEY
            );
          
            // save user token
            user.token = token;
            //set cookie
            res.cookie("token", token, { expire: new Date() + 9999 });

            return apiResponse.successResponseWithData(res, msg, user
                // user_name: user.user_name,
                // email: user.email,
                // profile_image: user.profile_image,
            );
        }
        return apiResponse.unauthorizedResponse(res, "Invalid Credentials");
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
};

exports.logout = (req, res) => {
    // console.log(req.body)
    res.clearCookie("token");
    res.json({
        msg: "Logout Successfully",
    });
};
