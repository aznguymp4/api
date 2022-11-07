process.on('uncaughtException', function(err) { console.error(err?.stack||err) })
import dotenv from 'dotenv'
import express, { json, response } from 'express'
import fetch from 'node-fetch'
import request from 'request'
import cors from 'cors'
//import https from 'https'
dotenv.config({path:'./.env'})
const app = express()
const PORT = process.env.LOCALPORT||process.env.PORT
const IP = process.env.IP
const REMOTE = `http://${IP}:${PORT}`
const httpsOptions = {
	cert : process.env.CERT,
	key  : process.env.KEY
}
//console.log(httpsOptions)

app.use(cors({
	allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
	exposedHeaders: ["authorization"], // you can change the headers
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false
}))
app.use(express.json())

app.get('/*', function(req,res) {
	const PATH = res.socket.parser.incoming.url
	if(PATH.startsWith(`/${process.env.PROXYKEY}`)) {
		request(res.socket.parser.incoming.query.redir).pipe(res)
		return
	}
	request(`${REMOTE}${PATH}`).pipe(res)
})

app.post('/*', function(req,res){
	fetch(`${REMOTE}${res.socket.parser.incoming.url}`, {headers: req.headers, method: 'POST', body:JSON.stringify(req.body)}).then(response => {
		console.log(response,1)
		res.status(response.status).send(response.statusText)
	}).catch(response => {
		console.error(response,0)
		res.status(404).send('Forbidden')
	})
})

//https.createServer(httpsOptions,app)
app
.listen(process.env.PORT,()=>{
	console.log(`API running on ${IP}:${PORT}`)
})
setInterval(()=>{ fetch('http://api.aznguy.com',{method:'GET'}) },1500000)
// ping every 25 minutes so it doesn't go to sleep mode cause heroku big dumb