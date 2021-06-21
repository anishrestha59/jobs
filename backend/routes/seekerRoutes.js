const router = require('express').Router();

const { registerSeeker, authSeeker } = require('../Controllers/seekerControllers');


router.route('/').post(registerSeeker);
router.route('/login').post(authSeeker);

module.exports = router;