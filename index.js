

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var express = require('express');
var tone = require('tone');

const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/tone', express.static(__dirname + '/node_modules/tone/build/'));
app.use('/audios', express.static(__dirname + '/audios/'));
app.use('/GUI',  express.static(__dirname + '/GUI/'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('click-row', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('click-row', msg);
      });

  });
http.listen(PORT, () => {
  console.log('listening on *:3000');
});
