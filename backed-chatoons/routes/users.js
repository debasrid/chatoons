const express = require('express');
const router = express.Router();
const Multer = require('multer');
const multerS3 = require('multer-s3');
const User = require('../models/user.js');

// Load the SDK for JavaScript
var aws = require('aws-sdk');

var credentials = new aws.SharedIniFileCredentials({ profile: 'private-account' });
aws.config.credentials = credentials;

const s3 = new aws.S3({
  region: 'us-east-2',
  Bucket: 'debby-labfiles'
});

const storage = new multerS3({
  s3: s3,
  bucket: 'debby-labfiles',
  key: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const multer = Multer({ storage: storage });
//----------------------------------------------------------file upload to s3 -------------------------//


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//GET username

// POST route => to create a new user
router.post('/', (req, res, next)=>{
 
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});


//upload user profile picture
router.post('/upload', multer.single('picture'), (req, res, next) => {

  console.log(req.file);
  Picture.create({
    name: req.body.name,
    path: req.file.location,
    originalName: req.file.originalname
  })
  .then(picture => {
    res.send(picture);
  })
  .catch(err => {
    console.log(err);
  })

})

// display Profile pic route
router.get

module.exports = router;
