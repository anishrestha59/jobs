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

router.route('/:id').get((req, res) => {
    Job.findById(req.params.id)
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req, res) => {
    Job.findByIdAndDelete(req.params.id)
        .then(() => res.json('Job deleted'))
        .catch(err => res.status(400).json('Error :' + err));
});

router.route('/update/:id').post((req, res) => {
    Job.findById(req.params.id)
        .then(jobs => {
            jobs.jobname = req.body.jobname;
            jobs.description = req.body.description;
            jobs.date = Date.parse(req.body.date);

            jobs.save()
                .then(() => res.json('Job updated'))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;