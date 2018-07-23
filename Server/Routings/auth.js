const router = require('express').Router();
const user = require('../Models/user')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tododb');
const userModel = mongoose.model('users', user);
const jwt = require("jsonwebtoken")


router.post('/login', async (req, res) => {

    const result = await userModel.findOne({ email: req.body.email });

    if (!result) {
        res.status(403).send({ message: 'user not found' });
    }

    if (result.password !== req.body.password) {
        res.status(402).send({ message: 'invalid password' });
    }
    const token = jwt.sign({ data: result }, "pass123")
    res.send({user : result, message: 'you are sign in', userToken: token });

});


router.post('/register', async (req, res) => {
    var post = req.body;
    const result = await userModel.create(post);
    // res.send(result);
    const token = jwt.sign({ data: result }, "pass123")
    res.send({ user : result, message: 'you are sign up', userToken: token });
    
});

module.exports = router;