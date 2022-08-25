const notesList = document.querySelector('#notes') 

const appendNote = note => {
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card card-body rounded-0 mb-2">
        <div class="d-flex justify-content-between">
            <h1 class="h3 card-title">${note.title}</h1>
            <div>
                <button class="btn btn-primary update" data-id="${note.id}">Update</button>
                <button class="btn btn-danger delete"  data-id="${note.id}">Delete</button>
            </div>
        </div>
        <p>${note.description}</p>
    </div>
    `

    const btnDelete = div.querySelector('.delete')
    btnDelete.addEventListener('click', () => {
        deleteNote(btnDelete.dataset.id)
    })

    const btnUpdate = div.querySelector('.update')
    btnUpdate.addEventListener('click', () => { 
        getNote(btnUpdate.dataset.id)
    })


    return div

}

const loadnotes = (notes) => {
    notesList.innerHTML = ''
    notes.forEach((note) => {
        notesList.append(appendNote(note))
    })

}

const noteAppend = (note) => { 
    notesList.append(appendNote(note))    
}