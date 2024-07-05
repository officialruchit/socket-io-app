const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
let counter = 0;

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the current counter value to the new client
  socket.emit("update counter", counter);

  socket.on("increment counter", () => {
    counter++;
    // Broadcast the new counter value to all clients
    io.emit("update counter", counter);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
