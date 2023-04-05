const express = require('express')
const { testFunction } = require('../controller/testcontroller')
const router = express.Router()

router.get('/hello', testFunction)

module.exports = router