const dotenv = require('dotenv')
const express = require('express')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
	res.send('Hello')
})

const PORT = process.env.PORT || 5000

app.listen(5000, () => console.log(`server started on ${PORT}`))
