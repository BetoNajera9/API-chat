import express from 'express'

const router = express.Router()

import user from '../../controllers/user'
import response from '../../utils/response'

router.get('/', async (req, res, next) => {
	try {
		const filter = req.query.user ?? null
		const listUsers = await user.getUsers(filter)
		response.succes(res, listUsers, 201)
	} catch (err) {
		response.error(res, err.user, err.status, err.details)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const userSent = user.addUser(req.body.user)
		if (userSent) response.succes(res, 'User sent', 201)
	} catch (err) {
		response.error(res, err.user, err.status, err.details)
	}
})

router.patch('/:id', async (req, res, next) => {
	try {
		const userUpdated = user.updateUser(req.params.id, req.body.user)
		if (userUpdated) response.succes(res, 'User modified', 201)
	} catch (err) {
		response.error(res, err.user, err.status, err.details)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const userDeleted = user.deleteUser(req.params.id)
		if (userDeleted) response.succes(res, 'User modified', 201)
	} catch (err) {
		response.error(res, err.user, err.status, err.details)
	}
})

export default router
