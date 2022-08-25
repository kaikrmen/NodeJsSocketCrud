"use strict";

var socket = io();

var saveNote = function saveNote(title, description) {
  socket.emit('client:newnote', {
    title: title,
    description: description
  });
};

var deleteNote = function deleteNote(id) {
  socket.emit('client:deletenote', id);
};

var getNote = function getNote(id) {
  socket.emit('client:getnote', id);
};

var updateNote = function updateNote(id, title, description) {
  socket.emit('client:updatenote', {
    id: id,
    title: title,
    description: description
  });
};

socket.on('server:newnote', function (data) {
  noteAppend(data);
});
socket.on('server:loadnotes', function (data) {
  loadnotes(data);
});
socket.on('server:selectednote', function (data) {
  var title = document.querySelector('#title');
  var description = document.querySelector('#description');
  title.value = data.title;
  description.value = data.description;
  noteID = data.id;
});