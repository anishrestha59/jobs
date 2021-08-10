const asyncHandler = require('express-async-handler');
let Seeker = require('../models/seeker.model');
const generateToken = require('../utils/generateToken');

const registerSeeker = asyncHandler(async(req, res) => {
    //const { profile } = (req.file) ? req.file.filename : null;
    const {seekername, gender, seekeraddress, age, contact, currentskill, resume, education, salary, experience, password } = req.body;
    const profile = req.file.filename;
    
    console.log(req.file)
    const seekerExists = await Seeker.findOne({ contact });

    if (seekerExists){
        res.status(400);
        throw new Error("User Already Exists");
    }

        const newSeeker = await Seeker.create({
            profile,
            seekername, 
            gender, 
            seekeraddress, 
            age, 
            contact, 
            currentskill,
            resume,
            education, 
            salary, 
            experience, 
            password,
        });
    
        if(newSeeker){
            res.status(201).json({
                _id:newSeeker._id,
                profile:newSeeker.profile,
                seekername:newSeeker.seekername,
                gender:newSeeker.gender,
                seekeraddress:newSeeker.seekeraddress,
                age:newSeeker.age,
                contact:newSeeker.contact,
                currentskill:newSeeker.currentskill,
                resume:newSeeker.resume,
                education:newSeeker.education,
                salary:newSeeker.salary,
                experience:newSeeker.experience,
                password:newSeeker.password,
            });
        }else{
            res.status(400)
            throw new Error('error occured!');
        }

});

const authSeeker = asyncHandler(async(req, res) => {
    const { contact, password } = req.body;

    const foundSeeker = await Seeker.findOne({ contact });

    if(foundSeeker && (await foundSeeker.matchPassword(password))){
        res.json({
            profile:foundSeeker.profile,
            _id:foundSeeker._id,
            seekername:foundSeeker.seekername,
            gender:foundSeeker.gender,
            seekeraddress:foundSeeker.seekeraddress,
            age:foundSeeker.age,
            contact:foundSeeker.contact,
            currentskill:foundSeeker.currentskill,
            resume:foundSeeker.resume,
            education:foundSeeker.education,
            salary:foundSeeker.salary,
            experience:foundSeeker.experience,
            password:foundSeeker.password,
            token:generateToken(foundSeeker._id),
        });
    }else{
        res.status(400);
        throw new Error("Invalid phone or password ");
    }

});

module.exports =  { registerSeeker, authSeeker } ;