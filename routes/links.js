const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
const filesController = require('../controllers/filesController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
    [
        check('name', 'Upload a file').not().isEmpty(),
        check('original_name', 'Upload a file').not().isEmpty(),
    ],
    auth,
    linksController.newLink
);

router.get('/:url',
    linksController.getLink,
    filesController.deleteFile
);
module.exports = router;