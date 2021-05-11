const express = require('express')
const app = express()
var jwt = require('jsonwebtoken');
var fs = require('fs');
require('dotenv').config({ path: './.env' });

const PORT = 3000

app.use(express.static('client'))

app.get('/',(req,res) => {
  res.sendFile('./index.html')
})

app.get('/services/jwt',(req,res) => {

  const header = {
    "alg": "ES256",
    "kid": process.env.ANOTHER_KEY,
    "typ": "JWT"
  }

  const payload = {
    "iss": process.env.TEAM_ID,
    "iat": Date.now() / 1000,
    "exp": (Date.now() / 1000) + 15778800,
    "origin": "https://localhost:3000"
  }

  var cert = fs.readFileSync('./AuthKey.p8');
  var token = jwt.sign(payload,cert, { header: header } );
  res.json({token: token})
})

app.listen(PORT,(req,res) => {
  console.log("Server has started on port 3000...")
})