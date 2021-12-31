const router = require('express').Router();
const User = require('../model/User');
const { registrationValidation } = require('../validations');

router.post('/register', async (req, res) => {
    const reqBody = req.body;

    const { error } = registrationValidation(reqBody);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: reqBody.name,
        email: reqBody.email,
        password: reqBody.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }

});


module.exports = router;
