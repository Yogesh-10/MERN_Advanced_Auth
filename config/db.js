const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log(`Mongo connected on ${conn.connection.host}`)
	} catch (error) {
		console.log(error.message)
	}
}

module.exports = connectDB
