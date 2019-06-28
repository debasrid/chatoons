const express = require('express');
const router = express.Router();
const moment = require('moment');
const Message = require('../models/messages');
const User = require('../models/user');

//get message from friend

router.post('/startchat',(req, res, next) => {
    Message.create({
        messengers: [req.body.senderid, req.body.receiverid],
        messagethreadtimestamp:moment(new Date()).format("YYYY-MM-DD HH:mm:ss:SSS"),
          messagethreadvisible: true,
        })
       .then(message =>{
        console.log(message._id);
        
        var newmessage=
        {messagesender:req.body.sender,
            messagereceiver:req.body.receiver,
            textmessage:req.body.textmessage,
            imagemessage:req.body.imagemessage,
            emoticonmessage:req.body.emoticonmessage,
            messagesent:moment(new Date()).format("YYYY-MM-DD HH:mm:ss:SSS")
        }
        Message.findByIdAndUpdate(message._id, { $push:{messages: newmessage} })
        .then(result => {
            setTimeout(() => {
                Message.findByIdAndUpdate(message._id, { messagethreadvisible: 'false' }, {new: true}).then(visibleresponse => {
                    console.log(visibleresponse)
                })
            }, 10000); // Create timer for thread expiry
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.send(err)})
        })
    })

    router.post('/:messagethreadid/sendmessage',(req, res, next) => {            
        var newmessage=
        {messagesender:req.body.sender,
            messagereceiver:req.body.receiver,
            textmessage:req.body.textmessage,
            imagemessage:req.body.imagemessage,
            emoticonmessage:req.body.emoticonmessage,
            messagesent:moment(new Date()).format("YYYY-MM-DD HH:mm:ss:SSS")
        }
       
        Message.findByIdAndUpdate(req.params.messagethreadid, { $push:{messages: newmessage} })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.send(err)})
    })

router.get('/:messagethreadid',(req, res, next) => {
    Message.findOne({_id:req.params.messagethreadid})
    .then(theResponse => {
        res.json(theResponse)
    })
    .catch(err => {
        res.json(err)})
    })

module.exports = router;