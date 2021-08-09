const router = require('express').Router();
let JobType = require('../models/jobtype.model');

router.route('/add').post((req, res) => {
    const jobtype = req.body.jobtype;
    const newJobType = new JobType({
        jobtype
    });

    newJobType.save()
        .then(() => {
            JobType.find()
            .then(jobtypes => res.json(jobtypes))
            .catch(err=> res.status(400));
        }
            )
        .catch(err => res.status(400).json('Error' + err));

});
router.route('/').get((req, res) => {
    JobType.find()
        .then(jobtype  => res.json(jobtype))
        .catch(err => res.status(400).json('Error' + err));
});
module.exports = router;
