const express = require('express');
const router = express.Router();
const moment = require('moment');
const Message = require('../models/messages');

//get message from friend

router.post('/startchat',(req, res, next) => {
    Message.create({
        messagethreadtimestamp:moment(new Date()).format("YYYY-MM-DD"),
          messagethreadvisible: true,
        })
       .then(message =>{
        console.log(message._id);
        
        var newmessage=
        {messagesender:req.body.senderid,
            messagereceiver:req.body.receiverid,
            imageURL:req.body.imageURL,
            emoticonURL:req.body.emoticonURL,
            messagesent:moment(new Date()).format("YYYY-MM-DD"),
            messagethreadvisible:true
        }
        console.log(newmessage);
        console.log('message', message)
        Message.findByIdAndUpdate(message._id, { $push:{messages: newmessage} })
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.send(err)})
        })
    })

router.get('/:messagethreadid',(req, res, next) => {
    Message.findOne({_id:messagethreadid})
    .then(theResponse => {
        res.json(theResponse);
    })
    .catch(err => {
        res.json(err)})
    })

module.exports = router;