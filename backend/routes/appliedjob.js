const router = require('express').Router();
let AppliedJob = require('../models/applied.model');

router.route('/add').post((req, res) => {
    const jobid = req.body.jobid;
    const seekerid = req.body.seekerid;

    console.log(jobid,seekerid);

    const newAppliedJob = new AppliedJob({
        jobid,
        seekerid
    });

    newAppliedJob.save()
    .then(() => {
        res.json('jobapplied');
    })
    .catch(err => {
         res.status(400).json('Error' + err)
    })
});

router.route('/:id').get((req, res) => {
    AppliedJob.find({seekerid: req.params.id},(err,appliedjobs) => {
        res.json(appliedjobs);
    });
});

router.route('/appliedseekers/:id').get((req, res) => {
    AppliedJob.find({jobid: req.params.id},(err, appliedseekers) => {
        res.json(appliedseekers);
    });
})
module.exports = router;