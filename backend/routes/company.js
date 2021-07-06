const router = require('express').Router();
const { registerCompany, authCompany, updateCompany } = require('../Controllers/companyController')
let Company = require('../models/company.model');

router.route('/').post(registerCompany);
router.route('/login').post(authCompany);

router.route('/update/:id').post((req, res) => {
    Company.findById(req.params.id)
        .then(company => {
            company.companyname = req.body.companyname;
            company.contact = req.body.contact;
            company.companyaddress = req.body.companyaddress;
            company.password = req.body.password;

            company.save()
                .then(() => res.json('Company updated'))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
});



module.exports = router;