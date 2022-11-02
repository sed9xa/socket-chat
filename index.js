const { response } = require("express");
let express = require("express");
const { Socket } = require("socket.io");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + '/public/'));

server.listen(3001, () => {
  console.log("Server running..");
});

io.on("connection", (socket) => {
  console.log("User id" + socket.id);
  socket.on('disconnect', () => {
    console.log('user ' + socket.id + ' disconnected');
  });
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});
