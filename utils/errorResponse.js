class ErrorResponse extends Error {
	constructor(message, statusCode) {
		//calling message from parent class(Error), so we use super keyword
		super(message)
		this.statusCode = statusCode
	}
}

module.exports = ErrorResponse
