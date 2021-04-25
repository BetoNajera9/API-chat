import mongoose from 'mongoose'

import config from '../config/envServer'

const USER = encodeURIComponent(config.user)
const PASSWORD = encodeURIComponent(config.pass)

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.host}/${config.db}?retryWrites=true&w=majority`

const connect = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		console.log('=> DB is connected')
	} catch (error) {
		console.log('=> Somethig goes wrong!\n' + error)
	}
}

export default connect
