const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
app.use(express.json());
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = "ReskillAmericans123";

 const passSchema = new mongoose.Schema({
   pass: {
       type: String, 
       required: true
   }});

   app.post('/pass',(req,res) => {
      const pass = {
          pass: req.body.pass
  }});

  bcrypt.genSalt(saltRounds)
 .then(salt => {
    bcrypt.hash(plainText, saltRounds)
    .then(hash => {
       console.log(hash);
    });
 });
bcrypt.compare(pass, hash).then(result => {
    console.log(result);
 });