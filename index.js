const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { get_curretn_user, user_disconect, join_user } = require("./user");
const { join } = require("path");

// app.use(express.static(__dirname + "../build"));
app.use(cors());

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://rumba-chat.netlify.app",
    methods: ["GET", "post"],
  },
});

io.on("connection", (socket) => {
  console.log("socket Id :" + socket.id);

  socket.on("disconnect", () => {
    const user = user_disconect(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        userId: user.id,
        userName: user.userName,
        text: `${user.userName} has left the room`,
      });
    }
  });
  socket.on("join_user", ({ roomId, userName }) => {
    const user = join_user(socket.id, userName, roomId);
    socket.join(user.roomId);

    console.log(`joined user with name : ${userName} to room ${roomId} `);
    socket.emit("message", {
      userId: user.id,
      userName: user.userName,
      text: `welcome ${user.userName}`,
    });
    socket.broadcast.to(user.roomId).emit("message", {
      userId: user.id,
      userName: user.userName,
      text: `${user.userName} has joined the room`,
    });
  });
  socket.on("chat", (text) => {
    const user = get_curretn_user(socket.id);
    io.to(user.roomId).emit("message", {
      userId: user.id,
      userName: user.userName,
      text: text,
    });
    console.log("message sending signal");
  });
});

server.listen(port, () => {
  console.log("server running on port :  4000");
});
