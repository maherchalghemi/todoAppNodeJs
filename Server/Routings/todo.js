const router = require("express").Router();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/tododb');
const User = require("../Models/user")
const userModel = mongoose.model("users", User);


router.post("/insert/:id", async (req,res)=>{
    var id = req.params.id ;
    todo = req.body ;
    const result = await userModel.findOneAndUpdate({_id: id},{ $addToSet: {todos: todo}}).exec();
    res.send(result);
});

router.post("/update/:id/:i", async (req,res)=>{
    var id = req.params.id;
    var i= "todos."+ req.params.i;
    var todo = req.body ;
    var todoUpdate = {
        $set : {[i] : todo }
    };
    const result = await userModel.findOneAndUpdate({_id: id}, todoUpdate).exec();
    res.send(result);
});

router.post("/delete/:id/:i", async (req,res)=>{
    var id = req.params.id;
    var i = req.params.i;
    const result = await userModel.findOneAndUpdate({_id: id}, {$pull: {"todos": {_id: i}}}).exec();
    res.send(result);
});






module.exports = router;