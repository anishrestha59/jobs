const router = require('express').Router();
let Views = require('../models/views.model');

router.route('/add/:jobid/:seekerid').post((req, res) => {
    const jobid = req.params.jobid;
    const seekerid = req.params.seekerid;
    console.log(jobid,seekerid)
    const newView = new Views({
        jobid,
        seekerid
    });

    newView.save()
        .then(() => {
            res.json(newView)
        }
            )
        .catch(err => res.status(400).json('Error' + err));

});

router.route('/checkviewedjobs/:jobid/:seekerid').get((req, res) => {
    
    Views.find({jobid:req.params.jobid, seekerid:req.params.seekerid},(err, viewedseekers) => {
        if(err){
            throw err;
        }else{
            res.json(viewedseekers);
        }
    })
});

router.route('/countviews/:jobid').get((req,res) => {
    Views.find({jobid:req.params.jobid},(err, viewedseekers) => {
        if(err){
            throw err;
        }else{
            res.json(viewedseekers);
        }
    })

})
module.exports = router;
