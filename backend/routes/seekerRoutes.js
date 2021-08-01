const router = require('express').Router();
let Seeker = require("../models/seeker.model")
const { registerSeeker, authSeeker } = require('../Controllers/seekerControllers');
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

router.route('/').post(upload.single('myFile'), registerSeeker);
router.route('/login').post(authSeeker);

router.route('/:id').get((req, res) => {
    Seeker.findById(req.params.id)
        .then(seekerinfo => res.json(seekerinfo))
        .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;