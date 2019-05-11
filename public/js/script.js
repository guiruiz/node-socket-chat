$(function() {
  var socket = io();
  var nickname = null;

  function setNickname() {
    nickname = prompt("Please enter your nick:", "");
    if (nickname == null || nickname == "") {
      setNickname();
    }
  }

  function buildMessage(content, author){
    if (author === undefined) {
        author =  'socket-chat';
    }
    return {
      author: author,
      content: content,
      timestamp: new Date().toLocaleTimeString()
    }
  }

  function appendMessage(message){
      var html = "<li> \
                      <span class='author'>"+ message.author +" says:</span> \
                      <span class='content'>"+ message.content +"</span> \
                      <span class='timestamp'>"+ message.timestamp +"</span>\
                     </li>";
      $("#messages").append(html);
  }

  socket.on('chat message', function(message){
    appendMessage(message);
  });

  $('#message-form').submit(function(e){
    e.preventDefault();
    message = buildMessage($('#message-textfield').val(), nickname)
    socket.emit('chat message', message);
    $('#message-textfield').val('');
    return false;
  });

  nickname = "Ruiz" // development purposes
  if (nickname == null) setNickname()

  appendMessage(buildMessage('Hello!'))
});
