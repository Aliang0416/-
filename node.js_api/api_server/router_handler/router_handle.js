//引入数据库
const db = require('../datebase/index')
//引入密码加密包
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const config = require('../config')
exports.reguser = (req,res)=>{
    const userinfo = req.body
    if(!userinfo.username||!userinfo.password){
        // res.send({status:1,msg:'账号或密码不能为空！'})
        res.cc('账号或密码不能为空！')
    }else{ 
        const sql = 'select * from ev_users where username=?'
        db.query(sql,[userinfo.username],(err,results)=>{
            if(err){
                // res.send({status:1,message:err.message})
                res.cc(err)
            }else if(results.length>0){
                // res.send({status:1,message:'用户名被占用，请更换其他用户名'})
                res.cc('用户名被占用，请更换其他用户名')
            }else{
                const sql1 = 'insert into ev_users set ?'
                userinfo.password = bcrypt.hashSync(userinfo.password,10)
                db.query(sql1,{username: userinfo.username,password:userinfo.password},(err,results)=>{
                    if(err){
                        // res.send({status:1,message:err.message})
                        res.cc(err)
                    }else{
                        if(results.affectedRows!==1){
                            // res.send({status:1,message:'注册用户失败，请稍后尝试'})
                            res.cc('注册用户失败，请稍后尝试')
                        }else{
                            // res.send({status:0,message:'用户注册成功'})
                            res.cc('用户注册成功',0)
                        }
                        
                    }
                })
            }
        })
    }
}
exports.login = (req,res)=>{
    const userinfo = req.body
    sql = 'select * from ev_users where username = ?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){
            res.cc(err)
        }else{
            if(results.length!==1){
                res.cc('该用户不存在')
            }else{
                const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)    
                if(!compareResult){
                    res.cc('用户名或密码错误')
                }else{
                    const user = {...results[0],password:'',user_pic:''}
                    //生成token字符串
                    const tokenStr = jwt.sign(user,config.jwtSecretkey,{
                        expiresIn:config.expiresIn
                    })
                    res.send({
                        status:0,
                        message:'登陆成功',
                        token: 'Bearer '+ tokenStr
                    })
                }        
            }
        }
    })
}