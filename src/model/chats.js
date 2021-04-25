import mongoose from 'mongoose'

const chat = new mongoose.Schema({
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
})

const model = mongoose.model('Chats', chat)

export default model
