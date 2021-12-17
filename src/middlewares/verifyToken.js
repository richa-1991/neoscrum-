const jwt = require("jsonwebtoken");
const Users = require("../models/user");

exports.verifyToken = async (req, res, next) => {
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
    //console.log(req.body,token);

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decodeData = jwt.verify(token, process.env.PRIMARY_KEY);
        const msg = "Access Denied!";
        const userCount = await Users.countDocuments({
            _id: decodeData._id,
        });
          
        if (userCount) {
            req.params = decodeData;
            return next();
        }
        //  console.log(req.params);
    } catch (err) {
      console.log(err);
        return res.status(401).send("Invalid Token");
    }
};
