const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callended");
	});

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emi("callUser", {
			signal: data.signalData,
			from: data.from,
			name: data.name,
		});
	});

	socket.on(
		"answerCall",
		(data) => {
			io.to(data.to).emit("callAccepted");
		},
		data.signal
	);
});

//just to remove node module

server.listen(5000, () => console.log("server is running"));
