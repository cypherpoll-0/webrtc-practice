const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)


io.on('connection', (socket) => {
    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit('callended')
    })

    socket.on('callUser', (data) => {
        io.to(data.userToCall).emi('callUser', {signal: data.signalData, from:data.from, name:data.name})
    })

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted')
    }, data.signal)
})


server.listen(5000, () => console.log("server is running"))