"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = require("socket.io");

var _http = _interopRequireDefault(require("http"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var httpServer = _http["default"].createServer(app);

var io = new _socket.Server(httpServer);
var notes = [];
app.use(_express["default"]["static"](__dirname + '/public'));
io.on('connection', function (socket) {
  console.log('connection established:', socket.id);
  socket.emit('server:loadnotes', notes);
  socket.on('client:newnote', function (data) {
    var note = {
      id: (0, _uuid.v4)(),
      title: data.title,
      description: data.description
    };
    notes.push(note);
    io.emit('server:newnote', note);
  });
  socket.on('client:deletenote', function (noteId) {
    notes = notes.filter(function (note) {
      return note.id !== noteId;
    });
    io.emit('server:loadnotes', notes);
  });
  socket.on('client:getnote', function (noteId) {
    var note = notes.find(function (note) {
      return note.id === noteId;
    });
    socket.emit('server:selectednote', note);
  });
  socket.on('client:updatenote', function (updateNote) {
    notes = notes.map(function (note) {
      if (note.id === updateNote.id) {
        note.title = updateNote.title;
        note.description = updateNote.description;
      }

      return note;
    });
    io.emit('server:loadnotes', notes);
  });
});
httpServer.listen(3000);
console.log('listening on port 3000');