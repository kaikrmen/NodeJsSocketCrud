import express  from "express"
import {Server as WebSocketServer} from "socket.io"
import http from "http"
import {v4 as uuid} from "uuid"
const app = express()
const httpServer = http.createServer(app) 
const io = new WebSocketServer(httpServer)

const notes = []
app.use(express.static(__dirname +'/public'));

io.on('connection', (socket)=>{
    console.log('connection established:', socket.id)
 

    socket.on('client:newnote', data => {
        const note = {  id: uuid(),
            title: data.title,
            description: data.description }
        console.log(note)
        notes.push(note)
    })
})

httpServer.listen(3000)
console.log('listening on port 3000')