const express = require('express');
const  UserCtrl  = require('../controller/user.controller');
const router = express.Router();
const upload = require('../middleware/multer.middleware');
const { verifyJWT } = require('../middleware/auth.middleware');

router.post('/register', UserCtrl.registerUser);
router.post('/login', UserCtrl.loginUser);
router.post('/logout', UserCtrl.logoutUser);
router.post("/refresh-token" , UserCtrl.refreshAccessToken)
router.post("/change-password",verifyJWT  , UserCtrl.changeCurrentPassword)
router.put("/update-account" ,verifyJWT , UserCtrl.updateAccountDetails)
router.post("/upload-profile",verifyJWT , upload.single('profileImage'), UserCtrl.uploadProfileImage)
router.post("/getuser",verifyJWT,  UserCtrl.getUserData)





module.exports = router;