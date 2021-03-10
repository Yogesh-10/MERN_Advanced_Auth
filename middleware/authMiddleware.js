const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const ErrorResponse = require('../utils/errorResponse')

const protect = async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// set token to, bearer token from header
		token = req.headers.authorization.split(' ')[1]
	}

	if (!token) {
		return next(new ErrorResponse('Not authorized to access this route', 401))
	}

	//If token, verify it
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findById(decoded.id) //taking the token from user(req.user), i.e logged in user and decode it

		// if (!user) {
		// 	return next(new ErrorResponse('No user found with this id', 404))
		// }
		req.user = user

		next()
	} catch (error) {
		return next(new ErrorResponse('Not authorized to access route', 401))
	}
}

module.exports = { protect }
