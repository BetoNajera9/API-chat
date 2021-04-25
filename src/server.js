import express from 'express'
import morgan from 'morgan'
import server from 'http'

import mongoDB from './libs/mongo'
import messages from './routes/messages'
import users from './routes/users'
import chats from './routes/chats'
import { connect } from './socket'

const router = express.Router()
const app = express()
mongoDB()

//M iddleware
app.use(router)
app.use(morgan('dev'))
app.use(express.json())

connect(server)

//Router
app.use('/app', express.static('public'))
app.use('/api/chats', chats)
app.use('/api/messages', messages)
app.use('/api/users', users)

server.Server(app).listen(3000, () => {
	console.log('The application is liten on port 3000')
})
