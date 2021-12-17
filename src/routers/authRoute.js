const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authController");
const { validator } = require("../middlewares/joiValidation");
const Schemas = require("../helpers/Schemas");




router.post("/login",validator(Schemas.login),login);
router.post("/logout", logout);


module.exports = router;
