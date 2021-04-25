import express from 'express'

const router = express.Router()

import chat from '../../controllers/chat'
import response from '../../utils/response'

router.get('/', async (req, res, next) => {
	try {
		const listChats = await chat.getChats()
		response.succes(res, listChats, 201)
	} catch (err) {
		response.error(res, err.chat, err.status, err.details)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const chatSent = chat.addChat(req.body.users)
		if (chatSent) response.succes(res, 'Chat sent', 201)
	} catch (err) {
		response.error(res, err.chat, err.status, err.details)
	}
})

router.patch('/:id', async (req, res, next) => {
	try {
		const chatUpdated = chat.updateChat(req.params.id, req.body.chat)
		if (chatUpdated) response.succes(res, 'Chat modified', 201)
	} catch (err) {
		response.error(res, err.chat, err.status, err.details)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const chatDeleted = chat.deleteChat(req.params.id)
		if (chatDeleted) response.succes(res, 'Chat modified', 201)
	} catch (err) {
		response.error(res, err.chat, err.status, err.details)
	}
})

export default router
