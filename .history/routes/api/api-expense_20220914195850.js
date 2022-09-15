const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('../../database/mongoose');

// Database Models
const newExpenseItem = require('../../database/models/expense-model');

// Get list of users
router.get('/leads', (req,res) =>{
    CRMLeadrModel.find({})
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
router.get('/lead/:leadID', (req,res) =>{
    CRMLeadrModel.findById(req.params.leadID,(err,lead) =>{
        if(err){
            res.status(500).send(err);
        } else if(lead !== null){
            res.send({ status: '202', lead});
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
        phone : req.body.phone,
        callerType : req.body.callerType,
        goal: req.body.goal
    });

    newUser.save((err, user) =>{
        console.log(err);
        if(err){
            if(err.code === 11000){
                res.send({status: 409,message: 'Phone Exists'});
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

// Create lead commment
router.post('/lead/comment', (req,res) =>{
    let newComment = new newExpenseItem({
        leadID: req.body.leadID,
        comment: req.body.comment
    });
    newComment.save((err,commentData) =>{
        if(err){
            if(err.code === 11000){
                res.send({status: 409,err: err});
            }
        }else{
            res.status(202).send({status: 202, commentData: commentData});
        }
    })
   
});

// Get Lead comments by lead ID
// router.get('/lead/comment/:leadID', (req,res) =>{
//     newExpenseItem.find({'leadID': req.params.leadID },(err,comments) =>{
//         if(err){
//             res.status(500).send(err);
//         } else if(comments !== null){
//             res.send({ status: '202', comments});
//         } else{
//             res.send({ status: '203 ', message: "No user found"});
//         }
//     });
// });
module.exports = router;