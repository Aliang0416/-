//引入数据库
const db = require('../datebase/index')
//引入密码加密包
const bcrypt = require('bcryptjs')
//获取用户信息
exports.getuserinfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            res.cc(err)
        } else {
            if (results.length !== 1) {
                res.cc('获取用户信息失败')
            }
            else {
                res.send({
                    status: 0,
                    message: '获取用户信息成功',
                    data: results[0]
                })
            }
        }
    })
}
// 修改用户信息
exports.updataUserinfo = (req, res) => {
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) {
            res.cc(err)
        } else {
            console.log(results)
            if (results.affectedRows !== 1) {
                res.cc('数据修改失败')
            } else {
                res.cc('数据修改成功', 0)
            }
        }
    })
}
// 修改密码
exports.updataPwd = (req, res) => {
    const sql = 'select * from ev_users where id = ? '
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            res.cc(err)
        } else {
            if (results.length !== 1) {
                res.cc('用户不存在')
            } else {
                const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
                if (!compareResult) {
                    res.cc('原密码错误')
                } else {
                    const sql = 'update ev_users set password = ? where id = ?'
                    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
                    db.query(sql, [newPwd, req.user.id], (err, results) => {
                        if (err) {
                            res.cc(err)
                        }else{
                            if (results.affectedRows !== 1){
                                res.cc('更新密码失败')
                            }else{
                                res.cc('更新密码成功', 0)
                            }
                        }
                    })
                }

            }
        }
    })
}
exports.update_avatar = (req,res)=>{
    const sql = 'update ev_users set user_pic = ? where id = ?'
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err){
            res.cc(err)
        }else{
            if(results.affectedRows!==1){
                res.cc('头像更新失败')
            }else{
                console.log(req.user)
                res.cc('头像更新成功',0)
            }
        }
    })
}