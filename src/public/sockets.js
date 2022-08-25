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

const updateNote = (id, title, description) => { 
    socket.emit('client:updatenote',{id, title, description})
}

socket.on('server:newnote', data =>{
    noteAppend(data)
})

socket.on('server:loadnotes', data =>{
    loadnotes(data)
})

socket.on('server:selectednote', data =>{ 
    const title = document.querySelector('#title')
    const description = document.querySelector('#description')

    title.value = data.title
    description.value = data.description

    noteID = data.id
})