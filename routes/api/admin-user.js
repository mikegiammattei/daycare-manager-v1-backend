const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('../../database/mongoose');

// Database Models
const AdminUserModel = require('../../database/models/admin-user');

// Get list of users
router.get('/users', (req,res) =>{
    AdminUserModel.find({}, { password: 0,__v: 0})
        .then((users) => {
            res.send({users:users});
        })
        .catch((err) => console.log(err));

});

router.post('/user/login', (req, res) => {
    AdminUserModel.findOne({"email" : req.body.email,"password" : req.body.password}, (err, response) =>{
        if (err) throw err;
        if(response){
            res.status(202).send({status: 202, userID: response._id});
        }else {
            res.status(203).send({status: 203});
        }
    });
});

// Get user by ID
router.get('/user/:userID', (req,res) =>{
    AdminUserModel.findById(req.params.userID,(err,user) =>{
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
router.post('/create', (req,res) =>{

    let newUser = new AdminUserModel({
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
router.delete('/user/:userID', (req,res) =>{
    AdminUserModel.findByIdAndDelete(req.params.userID,(err,user) =>{
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
router.delete('/user', (req,res) =>{
    AdminUserModel.deleteMany()
        .then(()=>{
            res.send("Records Deleted");
        })
        .catch((err) =>{
            res.send({err});
        });

});
module.exports = router;
