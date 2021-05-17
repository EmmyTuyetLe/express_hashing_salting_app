const express = require('express');
const app = express();
const PORT = 5000;
const jwt = require('jsonwebtoken');
app.use(express.json());
const secret= "suPErdupERBigs3cretjWt";

//create a token and send back to client
app.post('/sign-token',(req,res) => {
    //payload, an object that contains encoded info, sent as a JWT
    //secret
    //expiry time
    const payload = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
    };
   
    const expiry = 36000;
    jwt.sign(payload, secret, {expiresIn: expiry}, (err, token) => {
        if(err){
            return res.status(500).json({err})
        } else{
            return res.status(200).json({token})
        }
    })
})

//receive a token from client and decode it
app.get('/decode-token', (req, res)=>{
console.log(req.headers)
// pick authorization header
if(!req.headers.authorization){
    return res.status(403).json({message:"authentication token is required"})
}
const authHeader = req.headers.authorization;
//extract token
const splittedStr = authHeader.split(' ')
const token = splittedStr[1];
//decode token
jwt.verify(token, secret, (err, decodedToken) => {
    if(err){
        return res.status(500).json({err})
    } else{
        return res.status(200).json({user: decodedToken})
    }
})
})

app.listen(PORT, () => console.log("app started"));