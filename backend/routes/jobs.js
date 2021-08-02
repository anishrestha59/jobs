const router = require('express').Router();
let Job = require('../models/jobs.model');

router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/myjobs/:id').get((req, res) => {
    Job.find({companyid: req.params.id},(err,jobs=[]) => {
        res.json(jobs);
    });
});

router.route('/add').post((req, res) => {
    const companyprofile = req.body.companyprofile;
    const companyname = req.body.companyname;
    const companyid = req.body.companyid;
    const jobname = req.body.jobname;
    const jobtype = req.body.jobtype;
    const jobshift = req.body.jobshift;
    const salary = req.body.salary;
    const experience = req.body.experience;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newJobs = new Job({
        companyprofile,
        companyname,
        companyid,
        jobname,
        jobtype,
        jobshift,
        salary,
        experience,
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
            
            jobs.companyprofile = req.body.companyprofile;
            jobs.companyname = req.body.companyname;
            jobs.companyid = req.body.companyid;
            jobs.jobname = req.body.jobname;
            jobs.jobtype = req.body.jobtype;
            jobs.jobshift = req.body.jobshift;
            jobs.salary = req.body.salary;
            jobs.experience = req.body.experience;
            jobs.description = req.body.description;
            jobs.date = Date.parse(req.body.date);

            jobs.save()
                .then(() => res.json('Job updated'))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;