export default class responseError extends Error {
	constructor(message, details, status) {
		super(message)
		this.details = details
		this.status = status
	}
}
