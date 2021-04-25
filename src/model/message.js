import mongoose from 'mongoose'

const messsage = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	chat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Chat',
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	fileUrl: String,
	date: Date,
})

const model = mongoose.model('Message', messsage)

export default model
