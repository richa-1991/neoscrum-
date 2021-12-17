const express=require('express');

const {addUser,assignUsers}=require('../controllers/adminController');
const {verifyToken}=require('../middlewares/verifyToken')
const {isAdmin}=require('../middlewares/authentication')
const { validator } = require("../middlewares/joiValidation");

const schemas=require('../helpers/Schemas')
const router=express.Router();

router.post("/admin/addUser",verifyToken,isAdmin,validator(schemas.addUser),addUser);
router.post("/admin/assignUsers",verifyToken,isAdmin,assignUsers)




module.exports = router