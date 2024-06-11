const express = require('express')
const { register, login, logout, getMe, updateDetails, updatePassword, deleteUser }
    = require("../controllers/usersController")
const authorize = require("../middlewares/authorize")
const { loginRules, registerRules, updateDetailsRules, updatePasswordRules }
    = require('../middlewares/validator')
const validateResult = require("../middlewares/validationResults");
const router = express.Router()

router.post('/register', registerRules, validateResult, register);
router.post('/login', loginRules, validateResult, login);
router.get('/logout', authorize, logout);
router.get('/me', authorize, getMe);
router.put('/updatedetials', authorize, updateDetailsRules, validateResult, updateDetails);
router.put('/updatepassword', authorize, updatePasswordRules, validateResult, updatePassword);
router.delete('/delete', authorize, deleteUser);

module.exports = router;