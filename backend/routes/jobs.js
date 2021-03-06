const router = require('express').Router();
let Job = require('../models/jobs.model');
let JobTypes = require('../models/jobtype.model')

router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error' + err));
});


router.route('/myjobs/:id').get((req, res) => {
    Job.find({companyid: req.params.id},(err,jobs=[]) => {
        if(err){
            throw err;
        }else{
            res.json(jobs);
        }
    });
});

router.route('/add').post((req, res) => {
    const companyprofile = req.body.companyprofile;
    const companyname = req.body.companyname;
    const companyid = req.body.companyid;
    const jobname = req.body.jobname;
    const jobtype = req.body.jobtype;
    const gender = req.body.gender;
    const jobshift = req.body.jobshift;
    const salary = req.body.salary;
    const experience = req.body.experience;
    const description = req.body.description;
    const employementtype = req.body.employementtype;
    const vacancynumber = req.body.vacancynumber;
    const date = Date.parse(req.body.date);

    const newJobs = new Job({
        companyprofile,
        companyname,
        companyid,
        jobname,
        jobtype,
        gender,
        jobshift,
        salary,
        experience,
        description,
        employementtype,
        vacancynumber,
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
            jobs.gender = req.body.gender;
            jobs.jobshift = req.body.jobshift;
            jobs.salary = req.body.salary;
            jobs.experience = req.body.experience;
            jobs.description = req.body.description;
            jobs.employementtype = req.body.employementtype;
            jobs.vacancynumber = req.body.vacancynumber;
            jobs.date = Date.parse(req.body.date);

            jobs.save()
                .then(() => res.json('Job updated'))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
});



router.route('/jobtype/:jobtype').get((req, res) => {
    Job.find({jobtype: req.params.jobtype},(err,jobs) => {
        if(err){
            throw new err;
        }else{
        res.json(jobs);
        }
    });
});


module.exports = router;