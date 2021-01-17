const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
    [
        check('email', 'Add a correct email').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;