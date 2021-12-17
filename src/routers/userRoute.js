const express=require('express');
const {verifyToken}=require('../middlewares/verifyToken')
const {isUser}=require('../middlewares/authentication')

const { validator } = require("../middlewares/joiValidation");

const Schemas = require("../helpers/Schemas");

const {userList,feedbackSubmit,feedbackRecieved}=require('../controllers/userController')
const router=express.Router()

router.post('/user/list',verifyToken,isUser,userList);
router.post('/user/feedback',verifyToken,validator(Schemas.postComment),feedbackSubmit)
router.post('/user/feedback/received',verifyToken,feedbackRecieved)
module.exports=router;