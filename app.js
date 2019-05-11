var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
var master_socket = null

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/public/css'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('user connect', socket.id);

  socket.on('chat message', function(message){
    if (message.content == '/master'){
      master_socket = socket.id
      console.log("Master:" +master_socket)
    } else if (message.content == '/alert_master'){
      console.log("Message to master: "+ master_socket)
      socket.to(master_socket).emit('chat message', message);
    } else {
      io.emit('chat message', message);
    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnect', socket.id);
  });

});

http.listen(8080, function(){
  console.log('Listening on 8080')
});
