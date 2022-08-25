const socket = io()

const saveNote = (title, description) => {
    socket.emit('client:newnote', {
        title,
        description
   })
}

const deleteNote = (id) =>{
    socket.emit('client:deletenote', id)
}

const getNote = (id) => { 
    socket.emit('client:getnote', id)

}

socket.on('server:newnote', data =>{
    noteAppend(data)
})

socket.on('server:loadnotes', data =>{
    loadnotes(data)
})

socket.on('server:selectednote', data =>{ 
    console.log(data)
})