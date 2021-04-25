import socketIO from 'socket.io'

let socket = {}

const connect = (server) => {
	socket.io = socketIO(server)
}

export { connect, socket }
