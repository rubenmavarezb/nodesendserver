const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
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

router.get('/',
    linksController.allLinks
)

router.get('/:url',
    linksController.hasPassword,
    linksController.getLink
);

router.post('/:url',
    linksController.verifyPassword,
    linksController.getLink
)

module.exports = router;