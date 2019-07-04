require('dotenv').config()
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('../config/config')

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})

//app.use(formData.parse())


// send add friend request
router.post('/image-upload', (req, res) => {
  //const values = Object.values(req.body.files);
  const imagePaths = req.body.files.map(image => image.path);
  var results = [];
  imagePaths.forEach(function(imagePath) {
    cloudinary.uploader.upload(imagePath)
    .then(uploadRes => results.push(uploadRes.json))
    .catch(err => {
      res.json(err);
      })
  });
  res.json(results)  
}) 

module.exports = router;

//app.listen(process.env.PORT || 3000, () => console.log('👍'))