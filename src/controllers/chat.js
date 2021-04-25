import responseError from '../utils/responseError'
import chats from '../model/chats'

const addChat = async (users) => {
	if (!users) {
		console.error('[userController] Dont have user')
		throw new responseError('Data Error', 'Dont have user', 400)
	}

	try {
		const userAdded = new chats({
			users: [...users],
		})
		userAdded.save()
		return true
	} catch (err) {
		console.error(err)
	}
}

const getChats = async () => {
	const allChats = await chats.find().populate('user')
	if (!allChats) throw new responseError('Failed to get chats', err, 404)
	return allChats
}

const updateChat = async (id, user) => {
	const userId = await chats.findById(id)
	userId.user = user
	const userUpdated = await userId.save()
	if (!userId) throw new responseError('Failed to update user', err, 404)

	return userUpdated
}

const deleteChat = async (id) => {
	const userDeleted = await chats.findByIdAndRemove(id)
	if (!userDeleted) throw new responseError('Failed to update user', err, 404)

	return userDeleted
}

export default {
	getChats,
	addChat,
	updateChat,
	deleteChat,
}
