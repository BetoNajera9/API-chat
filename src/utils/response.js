const succes = (res, message, status) => {
	res.status(status ?? 200).send(message)
}

const error = (res, error, status, details) => {
	console.error(`[response Error] ${details}`)
	res.status(status ?? 400).send({
		message: 'Error in the operation',
		error,
	})
}

export default {
	succes,
	error,
}
