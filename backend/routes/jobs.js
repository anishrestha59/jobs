const router = require('express').Router();
let Job = require('../models/jobs.model');

router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const jobname = req.body.jobname;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newJobs = new Job({
        jobname,
        description,
        date
    });

    newJobs.save()
        .then(() => res.json('Jobs added!!!'))
        .catch(err => res.status(400).json('Error' + err));

});

module.exports = router;