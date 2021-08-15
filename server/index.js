
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require('path');


const port = process.env.PORT || 3001;


const app = express();
app.use(express.static(path.join(__dirname, '../client/build')));

const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", socket => {
    //console.log("New client connected");

    socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
      })

    socket.on("incoming data", (data)=>{
       socket.broadcast.emit("outgoing data", {num: data});
    });

    socket.on("disconnect", () => {
        
    });
    socket.on("send_tick", () => {
        console.log("tick recieved")
        io.emit("recieve_tick",[])
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));