const router = require('express').Router();

const{ registerUser } = require('../Controllers/seekerControllers');


router.route("/").post(registerUser);

module.exports = router;