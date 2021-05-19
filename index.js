const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
app.use(express.json());
const saltRounds = 10;
const plainText = "ReskillAmericans123";
const bcrypt = require('bcrypt');
let hashedPassword;

bcrypt.genSalt(saltRounds)
 .then(salt => {
   bcrypt.hash(plainText, saltRounds)
   .then(hash => {
      hashedPassword = hash
   });
 });

 console.log(hashedPassword);

app.post('/pass',(req,res) => {
let pass = req.body.pass;
let result = bcrypt.compareSync(pass,hashedPassword);
  return res.json({result})
});

app.listen(port,()=>console.log(`app listening on port ${port}`));
