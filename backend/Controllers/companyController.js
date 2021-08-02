const asyncHandler = require('express-async-handler');
let Company = require('../models/company.model');
const generateToken = require('../utils/generateToken');

const registerCompany = asyncHandler(async(req, res) => {
    const { companyname, contact, companyaddress, password} = req.body;
    const profile = req.file.filename;

    const companyExists = await Company.findOne({ contact });

    if (companyExists){
        res.status(400);
        throw new Error("Company Already Exists");
    }

        const newCompany = await Company.create({
            profile,
            companyname,
            contact,
            companyaddress,
            password,
        });
    
        if(newCompany){
            res.status(201).json({
                profile:newCompany.profile,
                _id:newCompany._id,
                companyname:newCompany.companyname,
                contact:newCompany.contact,
                companyaddress:newCompany.companyaddress,
                password:newCompany.password,
               
            });
        }else{
            res.status(400)
            throw new Error('error occured!');
        }
});

const authCompany = asyncHandler(async(req, res) => {
    const { contact, password } = req.body;

    const foundCompany = await Company.findOne({ contact });

    if(foundCompany && (await foundCompany.matchPassword(password))){
        res.json({
            profile:foundCompany.profile,
            _id:foundCompany._id,
            companyname:foundCompany.companyname,
            contact:foundCompany.contact,
            companyaddress:foundCompany.companyaddress,
            password:foundCompany.password,
            token:generateToken(foundCompany._id),
        });
    }else{
        res.status(400);
        throw new Error("Invalid phone or password ");
    }

});



module.exports =  { registerCompany, authCompany } ;