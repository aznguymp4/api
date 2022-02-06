process.on('uncaughtException', function(err) { console.error(err?.stack||err) })
import dotenv from 'dotenv'
import express from 'express'
import fetch from 'node-fetch'
import request from 'request'
import https from 'https'
dotenv.config({path:'./.env'})
const app = express()
const PORT = process.env.LOCALPORT||process.env.PORT
const IP = process.env.IP
const httpsOptions = {
	cert : process.env.CERT,
	key  : process.env.KEY
}
console.log(httpsOptions)

app.get('/*', function(req,res) {
	res.status(200).send('HELLO')
	//let link = `http://${IP}:${PORT}${res.socket.parser.incoming.url}`
	//request(link).pipe(res)
})

https.createServer(httpsOptions,app).listen(process.env.PORT,()=>{
    console.log(`API running on ${IP}:${PORT}`)
})
setInterval(()=>{ fetch('https://api.aznguy.com',{method:'GET'}) },1500000)
// ping every 25 minutes so it doesn't go to sleep mode cause heroku big dumb