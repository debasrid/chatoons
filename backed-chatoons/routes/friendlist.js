const express = require('express');
const router = express.Router();
const moment = require('moment');
const friendrequest = require('../models/friendrequest');
const User = require('../models/user');

//get friendlist
router.get('/all', (req, res, next) => {
    User.find(req.query.userId)
    .then(result =>{
        res.json(result)
    })
    .catch(err => {
        res.send(err)})
    })

//search friendlist

router.get('/search', (req, res, next) => {
    User.findOne({firstname: req.query.searchcriteria})
    .then(result =>{
        res.json(result)})
        .catch(err => {
            res.send(err)})
        })

// create router for add friend request
router.post('/addfriend', (req, res) => {
    friendrequest.create({
        sender:  req.body.userID,
        receiver:  req.body.frienduserID,
        sent_on: moment(new Date()).format("YYYY-MM-DD")
    })
    .then(response => {
        var newfriend = {
            frienduserid: response.sender, 
            friendrequestid: response._id
        };
        User.findByIdAndUpdate(req.body.userID, { $push:{friends: newfriend} })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
        res.json(err);
    })
    })
    .catch(err => {
    res.json(err);
    })
})    
      

module.exports = router;