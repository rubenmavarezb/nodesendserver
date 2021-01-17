const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { check } = require('express-validator');

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Must be a valid email').isEmail(),
        check('password', "Password must have at least 6 characters").isLength({min: 6})
    ],
    userController.createUser
);


module.exports = router;