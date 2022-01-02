const router = require('express').Router();
const User = require('../model/User');
const { registrationValidation } = require('../validations');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const reqBody = req.body;

    const { error } = registrationValidation(reqBody);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if email exists
    const emailExist = await User.findOne({ email: reqBody.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(reqBody.password, salt);

    // Create new users
    const user = new User({
        name: reqBody.name,
        email: reqBody.email,
        password: hashpassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error);
    }

});


module.exports = router;
