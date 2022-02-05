require('dotenv').config({path:'./.env'})
const express = require('express')
const app = express()
const PORT = process.env.LOCALPORT||process.env.PORT
const IP = process.env.IP
const request = require('request')

app.get('/*', function(req,res) {
	let link = `https://${IP}:${PORT}${res.socket.parser.incoming.url}`
	request(link).pipe(res)
});
app.listen(PORT, ()=>{
    console.log(`API running on ${IP}:${PORT}`)
})