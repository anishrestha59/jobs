const router = require('express').Router();
const asyncHandler = require('express-async-handler');
let Seeker = require('../models/seeker.model');

router.route('/').get((req, res) => {
    Seeker.find()
        .then(seeker => res.json(seeker))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/save').post((req, res) =>{
    const seekername = req.body.seekername;
    const gender = req.body.gender;
    const seekeraddress = req.body.seekeraddress;
    const age = req.body.age;
    const contact = req.body.contact;
    const skills = req.body.skills;
    const experience = req.body.experience;
    const password = req.body.password;
    
    const newSeeker = new Seeker({
        seekername,
        gender,
        seekeraddress,
        age,
        contact,
        skills,
        experience,
        password
    });
    newSeeker.save()
    .then(() => res.json('Companies info saved'))
    .catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
    Seeker.findById(req.params.id)
    .then(seeker => res.json(seeker))
    .catch((err) => res.status(400).json('Error' + err));
});


