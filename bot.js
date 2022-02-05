require('dotenv').config({path:'./.env'})
import express from 'express'
import fetch from 'node-fetch'
import request from 'request'
const app = express()
const PORT = process.env.LOCALPORT||process.env.PORT
const IP = process.env.IP
process.on('uncaughtException', function(err) { console.error(err?.stack||err) })

app.get('/*', function(req,res) {
	let link = `http://${IP}:${PORT}${res.socket.parser.incoming.url}`
	request(link).pipe(res)
});
app.listen(process.env.PORT, ()=>{
    console.log(`API running on ${IP}:${PORT}`)
})
setInterval(()=>{ fetch('http://api.aznguy.com',{method:'GET'}) },1500000)
// ping every 25 minutes so it doesn't go to sleep mode cause heroku big dumb