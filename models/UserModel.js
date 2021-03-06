const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide a username'],
	},
	email: {
		type: String,
		reqired: [true, 'Please provide a email'],
		unique: [true, 'Please provide a email'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	password: {
		type: String,
		required: [true, 'Please add a passoword'],
		minlenght: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
})

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

UserSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES,
	})
}

//Generate and hash ResetPassword Token
UserSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex')

	// Hash above restToken and set to resetPasswordToken field of UserSchema
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')

	// set expire to reset password
	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) //expires in 10 mins

	return resetToken
}

const User = mongoose.model('User', UserSchema)

module.exports = User
