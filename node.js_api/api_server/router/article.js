const express = require('express')
const router = express.Router()
const articleHandle = require('../router_handler/article')
router.post('/add',upload.single('cover_img'),articleHandle.addArticle)
module.exports = router