const express = require('express')
const app = express()
const cors = require('cors')
const joi = require('joi')
const config = require('./config')
const expressJWT = require('express-jwt')
app.use(cors())
app.use(express.urlencoded({extended:false}))
//定义一个中间件优化res.send代码
app.use((req,res,next)=>{
    res.cc = function(err,status=1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        }) 
    }
    next()
})
app.use(expressJWT({secret:config.jwtSecretkey}).unless({path:[/^\/api/]}))
const userRouter = require('./router/router')
app.use('/api',userRouter)
const userinforouter = require('./router/userinfo')
app.use('/my',userinforouter)
const artcateRouter = require('./router/artcate')
app.use('/my/article',artcateRouter)
const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError){
        res.cc(err)
    }else if(err.name === 'UnauthorizedError'){
        res.cc('身份认证失败')
    }
    else{
        res.cc(err)
    }
})
app.listen('80',()=>{
    console.log('http://127.0.0.1')
})