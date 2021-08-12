const router = require('express').Router();
let Seeker = require("../models/seeker.model")
const { registerSeeker, authSeeker } = require('../Controllers/seekerControllers');
var multer  = require('multer')


router.route('/getall').get((req, res) => {
  Seeker.find()
      .then(seekers => res.json(seekers))
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

router.route('/').post(upload.single('myFile'), registerSeeker);
router.route('/login').post(authSeeker);

router.patch('/profilepic/:id', upload.single('myFile'), async (req,res) => {
  try {
    
   await Seeker.findByIdAndUpdate(req.params.id, { profile: req.file.filename })
   .then(async ()=>{
     await Seeker.findById(req.params.id)
      .then((seekerinfo)=>{
        res.json(seekerinfo);
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
  Seeker.findByIdAndDelete(req.params.id)
      .then(() => res.json('Seeker deleted'))
      .catch(err => res.status(400).json('Error :' + err));
});

router.route('/update/:id').post((req, res) => {
  Seeker.findById(req.params.id)
      .then(seeker => {
          seeker.profile = req.body.profile;
          seeker.seekername = req.body.seekername;
          seeker.gender = req.body.gender;
          seeker.seekeraddress = req.body.seekeraddress;
          seeker.age = req.body.age;
          seeker.contact = req.body.contact;
          seeker.currentskill = req.body.currentskill;
          seeker.resume = req.body.resume;
          seeker.education = req.body.education;
          seeker.bestat = req.body.bestat;
          seeker.salary = req.body.salary;
          seeker.experience = req.body.experience; 
          seeker.password = req.body.password;

          seeker.save()
              .then(() => res.json(seeker))
              .catch(err => res.status(400).json('Error' + err));
      })
      .catch(err => res.status(400).json('Error' + err));
});



router.route('/:id').get((req, res) => {
    Seeker.findById(req.params.id)
        .then(seekerinfo => res.json(seekerinfo))
        .catch(err => res.status(400).json('Error' + err));
});


module.exports = router;