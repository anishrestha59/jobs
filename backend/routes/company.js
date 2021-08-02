const router = require('express').Router();
const { registerCompany, authCompany, updateCompany } = require('../Controllers/companyController')
let Company = require('../models/company.model');
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/jobportalreact/jobs/public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

router.route('/').post(upload.single('myFile'),registerCompany);
router.route('/login').post(authCompany);

router.route('/update/:id').post((req, res) => {
    Company.findById(req.params.id)
        .then(company => {
            company.companyname = req.body.companyname;
            company.contact = req.body.contact;
            company.companyaddress = req.body.companyaddress;
            company.password = req.body.password;

            company.save()
                .then(() => res.json(company))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/getdetails/:id').get((req, res) => {
    Company.findById(req.params.id)
        .then(companyinfo => res.json(companyinfo))
        .catch(err => res.status(400).json('Error' + err));
});


module.exports = router;