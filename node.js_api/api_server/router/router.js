const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {reg_login_schema} = require('../schema/user')
const routerhandler = require('../router_handler/router_handle')
router.post('/reguser',expressJoi(reg_login_schema),routerhandler.reguser)
router.post('/login',expressJoi(reg_login_schema),routerhandler.login)
module.exports = router 