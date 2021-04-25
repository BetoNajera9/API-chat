import responseError from '../utils/responseError'
import users from '../model/users'

const addUser = async (user) => {
	if (!user) {
		console.error('[userController] Dont have user')
		throw new responseError('Data Error', 'Dont have user', 400)
	}

	try {
		const userAdded = new users({
			user,
		})
		userAdded.save()
		return true
	} catch (err) {
		console.error(err)
	}
}

const getUsers = async (filter) => {
	let allUsers = null
	if (filter !== null) {
		allUsers = await users.find({
			user: filter,
		})
	} else {
		allUsers = await users.find()
	}
	if (!allUsers) throw new responseError('Failed to get users', err, 404)
	return allUsers
}

const updateUser = async (id, user) => {
	const userId = await users.findById(id)
	userId.user = user
	const userUpdated = await userId.save()
	if (!userId) throw new responseError('Failed to update user', err, 404)

	return userUpdated
}

const deleteUser = async (id) => {
	const userDeleted = await users.findByIdAndRemove(id)
	if (!userDeleted) throw new responseError('Failed to update user', err, 404)

	return userDeleted
}

export default {
	getUsers,
	addUser,
	updateUser,
	deleteUser,
}
