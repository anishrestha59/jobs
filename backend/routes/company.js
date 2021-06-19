const router = require('express').Router();
const { registerCompany, authCompany } = require('../Controllers/companyController')


router.route('/').post(registerCompany);
//router.route('/login').post(authCompany);

module.exports = router;