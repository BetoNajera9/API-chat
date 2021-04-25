import express from 'express'
import multer from 'multer'

const router = express.Router()

import message from '../../controllers/message'
import response from '../../utils/response'

const upload = multer({
	dest: 'public/files/',
})

router.get('/', async (req, res, next) => {
	try {
		const filter = req.query.user ?? null
		const listMessages = await message.getMessages(filter)
		response.succes(res, listMessages, 201)
	} catch (err) {
		response.error(res, err.message, err.status, err.details)
	}
})

router.post('/', upload.single('file'), async (req, res, next) => {
	try {
		const messageSent = message.addMessage(
			req.body.user,
			req.body.message,
			req.body.chat,
			req.file
		)
		if (messageSent) response.succes(res, 'Message sent', 201)
	} catch (err) {
		response.error(res, err.message, err.status, err.details)
	}
})

router.patch('/:id', async (req, res, next) => {
	try {
		const messageUpdated = message.updateMessage(
			req.params.id,
			req.body.message
		)
		if (messageUpdated) response.succes(res, 'Message modified', 201)
	} catch (err) {
		response.error(res, err.message, err.status, err.details)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const messageDeleted = message.deleteMessage(req.params.id)
		if (messageDeleted) response.succes(res, 'Message modified', 201)
	} catch (err) {
		response.error(res, err.message, err.status, err.details)
	}
})

export default router
