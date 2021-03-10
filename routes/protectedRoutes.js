const express = require('express')
const router = express.Router()
const { getPrivateData } = require('../controllers/protectedController')
const { protect } = require('../middleware/authMiddleware')

router.route('/protected').get(protect, getPrivateData)

module.exports = router
