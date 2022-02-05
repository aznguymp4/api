require('dotenv').config({path:'./.env'})
const express = require('express')
const app = express()
const PORT = process.env.LOCALPORT||process.env.PORT
const IP = process.env.IP
const fetch = require('node-fetch')
const request = require('request')
process.on('uncaughtException', function(err) { console.error(err?.stack||err) })

app.get('/*', function(req,res) {
	console.log(req,res)
	let link = `https://${IP}:${PORT}${res.socket.parser.incoming.url}`
	request(link).pipe(res)
});
app.listen(PORT, ()=>{
    console.log(`API running on ${IP}:${PORT}`)
})
setInterval(()=>{ fetch('http://api.aznguy.com',{method:'GET'}) },1500000)
// ping every 25 minutes so it doesn't go to sleep mode cause heroku big dumb