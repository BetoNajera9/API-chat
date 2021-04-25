import env from 'dotenv'

env.config()

export default {
	user: process.env.DB_USER,
	pass: process.env.DB_PASSWORD,
	db: process.env.DB_NAME,
	host: process.env.DB_HOST,
}
