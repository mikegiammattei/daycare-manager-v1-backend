const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('../../database/mongoose');

// Database Models
const CRMLeadrModel = require('../../database/models/crm-lead');

// Get list of users
router.get('/lead', (req,res) =>{
    CRMLeadrModel.find({}, { password: 0,__v: 0})
        .then((users) => {
            res.send({users:users});
        })
        .catch((err) => console.log(err));

});

// Update User user by ID
router.patch('/lead/:id', (req,res) =>{

    CRMLeadrModel.findByIdAndUpdate(req.params.id, req.body, (err, results) => {
        if (err) throw err;
        if(results){
            res.send({status: 202, message: "User Updated"});
        }else {
            res.send({status: 203, message: "Unauthorized"});
        }
    });
});

// Get user by ID
router.get('/lead/:userID', (req,res) =>{
    CRMLeadrModel.findById(req.params.userID,(err,user) =>{
        if(err){
            res.status(500).send(err);
        } else if(user !== null){
            res.send({ status: '202', userData: user});
        } else{
            res.send({ status: '203 ', message: "No user found"});
        }
    });
});

// Create a new user.
router.post('/lead', (req,res) =>{

    let newUser = new CRMLeadrModel({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
    });
    newUser.save((err, user) =>{
        if(err){
            if(err.code === 11000){
                res.send({status: 409,message: 'Email Exists'});
            }else{
                res.sendStatus(500);
            }

        }else{
            res.send({status: 202, userID: user._id});
        }
    });
});
// Delete user by ID
router.delete('/lead/:userID', (req,res) =>{
    CRMLeadrModel.findByIdAndDelete(req.params.userID,(err,user) =>{
        if(err){
            res.status(500).send(err);
        } else if(user !== null){
            res.sendStatus(202);
        } else{
            res.sendStatus(404);
        }
    });
});
// Delete all users
router.delete('/lead', (req,res) =>{
    CRMLeadrModel.deleteMany()
        .then(()=>{
            res.send("Records Deleted");
        })
        .catch((err) =>{
            res.send({err});
        });

});
module.exports = router;
