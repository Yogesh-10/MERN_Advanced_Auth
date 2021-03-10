const dotenv = require('dotenv')
const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

//Error Handler (should be last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(5000, () => console.log(`server started on ${PORT}`))

// process.on('unhandledRejection', (err, promise) => {
// 	console.log(`Logged Error: ${err}`)
// 	server.close(() => process.exit(1))
// })
