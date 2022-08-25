import express  from "express"
import {Server as WebSocketServer} from "socket.io"
import http from "http"
import {v4 as uuid} from "uuid"
const app = express()
const httpServer = http.createServer(app) 
const io = new WebSocketServer(httpServer)

let notes = []

app.use(express.static(__dirname +'/public'));

io.on('connection', (socket)=>{
    console.log('connection established:', socket.id)
 
    socket.emit('server:loadnotes', notes)

    socket.on('client:newnote', data => {
        const note = {  
            id: uuid(),
            title: data.title,
            description: data.description 
        }
        notes.push(note)

        io.emit('server:newnote', note)
    })

    socket.on('client:deletenote', (noteId) => { 
        notes = notes.filter((note) => note.id !== noteId);
        io.emit('server:loadnotes', notes)
    })

    socket.on('client:getnote', (noteId) => {
        const note = notes.find(note => note.id === noteId)
        socket.emit('server:selectednote', note)
    })

    socket.on('client:updatenote', (updateNote) => {
        notes = notes.map((note) => {
            if(note.id ===updateNote.id) {
                note.title = updateNote.title
                note.description = updateNote.description
            }
            return note
        })
        io.emit('server:loadnotes', notes)
    })
})

httpServer.listen(3000)
console.log('listening on port 3000')