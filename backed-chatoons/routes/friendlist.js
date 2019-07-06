const express = require('express');
const router = express.Router();
const moment = require('moment');
const mongoose = require('mongoose');
const friendrequest = require('../models/friendrequest');
const User = require('../models/user');

//get friendlist
router.get('/getFriends', (req, res, next) => {
    User.findById(req.query.userId)
    .then(result =>{
        var friendIds = result.friends.map(friend => friend.frienduserid );
       
        User.find({'_id': { $in: friendIds}})
        .then(friendList => {
            console.log('friendList: '+friendList)
            res.json(friendList)
        })
        .catch(err => {
            res.send(err)})
        })
        .catch(err => {
            res.send(err)})        
    })

//search friendlist

router.get('/search', (req, res, next) => {
    User.find({firstname: req.query.searchcriteria})
    .then(result =>{
        console.log("User found: "+result);
        res.json(result[0])
    })
    .catch(err => {
        res.send(err)
    })
})

// send add friend request
router.post('/addfriend', (req, res) => {
    User.findById(req.body.userId)
    .then(result =>{
        var friendList = result.friends;
        const index = friendList.findIndex(friend => friend.frienduserid.toString()===req.body.frienduserId);
        
        if(index==-1) {
            var friendRequestList = result.friendrequestssent;
            const indexfriendrequest = friendRequestList.findIndex(friendrequestsent => friendrequestsent.frienduserid.toString()===req.body.frienduserId);

            if(indexfriendrequest==-1) {
                var newfriend = {
                    frienduserid: req.body.frienduserId, 
                    friendrequestSentOn: moment(new Date()).format("YYYY-MM-DD HH:mm:ss:SSS")
                };
                            
                User.findByIdAndUpdate(req.body.userId, { $push:{friendrequestssent: newfriend} })
                    .then(theResponse => {
                        var newfriendrequest = {
                            frienduserid: req.body.userId, 
                            friendrequestSentOn: moment(new Date()).format("YYYY-MM-DD HH:mm:ss:SSS")
                        };
                                        
                        User.findByIdAndUpdate(req.body.frienduserId, { $push:{friendrequestsreceived: newfriendrequest} })
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
            }

            
        } else {
            switch(friendList[index].friendrequeststatus) {
                case 'ACCEPTED':
                  res.send(new Error('Friend already in your friend list'));
                  break;
                case 'DECLINED':
                  res.send(new Error('Friend already declined your request'));
                  break;
                case 'PENDING':
                  res.send(new Error('Friend request already pending'));
                  break;
                default:
                  res.send(new Error('Invalid request status'));
              }             
        }
    })
    .catch(err => {
        res.send(err)
    })
    
})    

// respond to add friend request
router.post('/respondfriendrequest', (req, res) => {

    User.findById(req.body.userId)
    .then(result =>{
        var friendRequestList = result.friendrequestssent;
        var index = friendRequestList.findIndex(friend => friend.frienduserid.toString()===req.body.frienduserId);
        
        friendRequestList[index].friendrequeststatus = req.body.requeststatus;

        User.findByIdAndUpdate(req.body.userId, {friendrequestssent: friendRequestList})
        .then(theResponse => {

            User.findById(req.body.frienduserId)
            .then(result =>{
                var friendRequestList = result.friendrequestsreceived;
                index = friendRequestList.findIndex(friendrequest => friendrequest.frienduserid.toString()===req.body.userId);
                friendRequestList[index].friendrequeststatus = req.body.requeststatus;
                friendRequestList[index].friendrequestRespondedOn = moment(new Date()).format("YYYY-MM-DD HH:mm:ss:SSS");

                User.findByIdAndUpdate(req.body.frienduserId, {friendrequestsreceived: friendRequestList})
                .then(theResponse => {
                    if(req.body.requeststatus==='ACCEPTED') {                        
                        var newfriend = {
                            frienduserid: req.body.userId, 
                            friendfirstname: req.body.userfirstname,
                            friendlastname: req.body.userlastname,
                            friendimageUrl: req.body.userimageUrl
                        };
                                    
                        User.findByIdAndUpdate(req.body.frienduserId, { $push:{friends: newfriend} })
                            .then(theResponse => {
                                
                                newfriend = {
                                    frienduserid: req.body.frienduserId, 
                                    friendfirstname: req.body.friendfirstname,
                                    friendlastname: req.body.friendlastname,
                                    friendimageUrl: req.body.friendimageUrl
                                };
                                            
                                User.findByIdAndUpdate(req.body.userId, { $push:{friends: newfriend} })
                                    .then(theResponse => {
                                        res.json(theResponse);
                                    })

                            })
                            .catch(err => {
                                res.json(err);
                            })
                    } else {
                        res.json(theResponse);
                    }
                })
            })          
        })
        .catch(err => {
        res.json(err);
        })
    })
    .catch(err => {
        res.send(err)
    })

 })    
      

module.exports = router;