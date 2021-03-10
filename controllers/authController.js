const User = require('../models/UserModel')

const register = async (req, res, next) => {
	const { username, email, password } = req.body
	try {
		const user = await User.create({
			username,
			email,
			password,
		})

		res.status(201).json({
			success: true,
			user,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

const login = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		res
			.status(400)
			.json({ success: false, error: 'Not a valid email or password' })
	}

	try {
		const user = await User.findOne({ email }).select('+password')

		if (!user) {
			res.status(404).json({ success: false, error: 'Invalid Credentials' })
		}

		const isMatch = await user.matchPasswords(password)

		if (!isMatch) {
			res.status(404).json({ success: false, error: 'Invalid Credentials' })
		}

		res.status(200).json({
			success: true,
			token: 'eojnveejno',
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

const forgotPassword = (req, res, next) => {
	res.send('forgotPassword')
}

const resetPassword = (req, res, next) => {
	res.send('resetPassword')
}

module.exports = { register, login, forgotPassword, resetPassword }
