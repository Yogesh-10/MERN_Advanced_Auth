const User = require('../models/UserModel')
const ErrorResponse = require('../utils/errorResponse')

const register = async (req, res, next) => {
	const { username, email, password } = req.body
	try {
		const user = await User.create({
			username,
			email,
			password,
		})

		sendToken(user, 201, res)
	} catch (error) {
		next(error)
	}
}

const login = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new ErrorResponse('Please provide Email and Password', 400))
	}

	try {
		const user = await User.findOne({ email }).select('+password')

		if (!user) {
			return next(new ErrorResponse('Invalid Credentials', 401))
		}

		const isMatch = await user.matchPasswords(password)

		if (!isMatch) {
			return next(new ErrorResponse('Invalid Credentials', 401))
		}

		sendToken(user, 200, res)
	} catch (error) {
		next(error)
	}
}

const forgotPassword = (req, res, next) => {
	res.send('forgotPassword')
}

const resetPassword = (req, res, next) => {
	res.send('resetPassword')
}

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken()
	res.status(statusCode).json({ success: true, token })
}

module.exports = { register, login, forgotPassword, resetPassword }
