const router = require('express').Router();
const { registerCompany, authCompany, updateCompany } = require('../Controllers/companyController')
let Company = require('../models/company.model');
var multer  = require('multer')

router.route('/getall').get((req, res) => {
  Company.find()
      .then(companies => res.json(companies))
      .catch(err => res.status(400).json('Error' + err));
});


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

router.patch('/profilepic/:id', upload.single('myFile'), async (req,res) => {
  try {
    console.log(req.params.id,req.file.filename);
   await Company.findByIdAndUpdate(req.params.id, { profile: req.file.filename })
   .then(async()=>{
     await Company.findById(req.params.id)
      .then((companyinfo)=>{
        console.log(companyinfo);
        res.json(companyinfo);
      }).catch((err)=>{
        res.status(400);
      });

   }).catch((err)=>{
     res.status("something went wrong"+400);
   });
   
  } catch (error) {
   console.log("tried to patch profile"+error);
  }
 
});

router.route('/delete/:id').delete((req, res) => {
  Company.findByIdAndDelete(req.params.id)
      .then(() => res.json('Company deleted'))
      .catch(err => res.status(400).json('Error :' + err));
});

router.route('/update/:id').post((req, res) => {
    Company.findById(req.params.id)
        .then(company => {
            company.profile = req.body.profile;
            company.companyname = req.body.companyname;
            company.contact = req.body.contact;
            company.companyaddress = req.body.companyaddress;
            company.country = req.body.country;
            company.email = req.body.email;
            company.companywebsite = req.body.companywebsite;
            company.postalcode = req.body.postalcode; 
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