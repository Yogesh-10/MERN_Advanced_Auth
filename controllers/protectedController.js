const getPrivateData = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: 'Access allowed to route',
	})
}

module.exports = { getPrivateData }
