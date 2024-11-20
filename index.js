const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('CLIENT_SEND_MESSAGE', (data) => {
    // 1) io.emit() gửi tin nhắn cho tất cả người dùng truy cập vào web (bao gồm cả người gửi data này)
    // io.emit('SERVER_SEND_MESSAGE', data);

    // 2) socket.emit() tin nhắn CHỈ gửi lại client cho chính người này gửi data lên
    // Ví dụ: ô A gửi tin nhắn này thì chỉ ô A nhận tin nhắn này
    // socket.emit('SERVER_SEND_MESSAGE', data);

    // 3) socket.broadcast.emit(), nếu ô A gửi tin nhắn này, thì tất cả mọi người đều nhận tin nhắn, trừ ô A (ô A sẽ ko nhận dc)
    socket.broadcast.emit('SERVER_SEND_MESSAGE', data);
  });
})

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});