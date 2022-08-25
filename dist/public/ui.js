"use strict";

var notesList = document.querySelector('#notes');
var noteID = '';

var appendNote = function appendNote(note) {
  var div = document.createElement('div');
  div.innerHTML = "\n    <div class=\"card card-body rounded-0 mb-2 animate__animated animate__fadeInUp\">\n        <div class=\"d-flex justify-content-between\">\n            <h1 class=\"h3 card-title\">".concat(note.title, "</h1>\n            <div>\n                <button class=\"btn btn-primary update\" data-id=\"").concat(note.id, "\">Update</button>\n                <button class=\"btn btn-danger delete\"  data-id=\"").concat(note.id, "\">Delete</button>\n            </div>\n        </div>\n        <p>").concat(note.description, "</p>\n    </div>\n    ");
  var btnDelete = div.querySelector('.delete');
  btnDelete.addEventListener('click', function () {
    deleteNote(btnDelete.dataset.id);
  });
  var btnUpdate = div.querySelector('.update');
  btnUpdate.addEventListener('click', function () {
    getNote(btnUpdate.dataset.id);
  });
  return div;
};

var loadnotes = function loadnotes(notes) {
  notesList.innerHTML = '';
  notes.forEach(function (note) {
    notesList.append(appendNote(note));
  });
};

var noteAppend = function noteAppend(note) {
  notesList.append(appendNote(note));
};