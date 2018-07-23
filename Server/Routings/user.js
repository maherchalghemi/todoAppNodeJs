const router = require('express').Router();
const mongoose = require('mongoose');

const User = require("../Models/user");
mongoose.connect('mongodb://localhost:27017/tododb');

const userModel = mongoose.model('users', User);

router.get('/all', async (req, res) => {
    const result = await userModel.find().exec();
    res.send(result);
});

router.get('/user/:id', async (req, res) => {
    id = req.params.id;
    console.log(id);
    const result = await userModel.findById(id).exec();
    res.send(result);
});

// facon update 1 
router.post('/update/:id', async (req, res) => {
    id = req.params.id;
    var post = req.body;
    var objectUpdate = {
        $set : post
    };
    const result = await userModel.findByIdAndUpdate(id,objectUpdate).exec();
   
    res.send(result);
});

// facon update 2

router.post('/update2/:id', async (req, res) => {
    id = req.params.id;
    var post = req.body;
    var objectUpdate = {
        $set : post
    };
    const result = await userModel.updateOne({_id: id}, objectUpdate).exec();
    
    res.send(result);
});



module.exports = router;
