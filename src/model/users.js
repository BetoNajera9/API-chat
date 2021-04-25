import mongoose from 'mongoose'

const user = new mongoose.Schema({
	user: String,
})

const model = mongoose.model('User', user)

export default model
