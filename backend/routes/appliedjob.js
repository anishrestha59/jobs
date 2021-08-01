const router = require('express').Router();
let AppliedJob = require('../models/applied.model');

router.route('/add').post((req, res) => {
    const jobid = req.body.jobid;
    const seekerid = req.body.seekerid;
    const message = req.body.message;

    const newAppliedJob = new AppliedJob({
        jobid,
        seekerid,
        message
    });

    newAppliedJob.save()
    .then(() => {
        res.json('jobapplied');
    })
    .catch(err => {
         res.status(400).json('Error' + err)
    })
});

router.route('/update/:id').post((req, res) => {
    AppliedJob.findById(req.params.id)
        .then(apply => {

            apply.seekerid = req.body.seekerid;
            apply.jobid = req.body.jobid;
            apply.message = req.body.message;

            apply.save()
                .then(() => res.json(apply))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/getdetail/:id').get((req, res) => {
    AppliedJob.findById(req.params.id)
        .then(appliedinfo => res.json(appliedinfo))
        .catch(err => res.status(400).json('Error' + err));
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