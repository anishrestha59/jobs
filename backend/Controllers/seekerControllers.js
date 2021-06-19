const registerUser = async (req, res) => {
    const{ seekername, gender, seekeraddress, age, contact, skills, salary, experience, password} = req.body;

    res.json({
        seekername,
        contact,
    });

};

module.exports =  registerUser ;