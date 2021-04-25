import responseError from '../utils/responseError'
import messages from '../model/message'
import { socket } from '../socket'

const addMessage = async (user, message, chat, file) => {
	let fileUrl = ''
	if (file) {
		fileUrl = `http://localhost:3000/app/files/${file.filename}`
	}
	try {
		const fullMessage = {
			user,
			chat,
			message,
			fileUrl,
			date: new Date(),
		}

		const messageAdded = new messages(fullMessage)
		messageAdded.save()

		socket.io.emit('message', fullMessage)

		return true
	} catch (err) {
		console.error(err)
	}
}

const getMessages = async (filter) => {
	let allMessages = null
	if (filter !== null) {
		allMessages = await messages
			.find({
				user: filter,
			})
			.populate('user')
	} else {
		allMessages = await messages.find().populate('user')
	}
	if (!allMessages) throw new responseError('Failed to get messages', err, 404)
	return allMessages
}

const updateMessage = async (id, message) => {
	const messageId = await messages.findById(id)
	messageId.message = message
	const messageUpdated = await messageId.save()
	if (!messageId) throw new responseError('Failed to update message', err, 404)

	return messageUpdated
}

const deleteMessage = async (id) => {
	const messageDeleted = await messages.findByIdAndRemove(id)
	if (!messageDeleted)
		throw new responseError('Failed to update message', err, 404)

	return messageDeleted
}

export default {
	getMessages,
	addMessage,
	updateMessage,
	deleteMessage,
}
