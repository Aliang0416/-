const expressJoi = require('@escook/express-joi')
const express = require('express')
const router = express.Router()
const userinfohandler = require('../router_handler/userinfo_handle')
const { updata_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
//获取用户信息
router.get('/userinfo',userinfohandler.getuserinfo)
// 修改用户信息
router.post('/userinfo',expressJoi(updata_userinfo_schema),userinfohandler.updataUserinfo)
// 修改密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfohandler.updataPwd)
//修改头像
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfohandler.update_avatar)
module.exports = router