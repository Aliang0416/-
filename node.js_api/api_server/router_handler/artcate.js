//引入数据库
const db = require('../datebase/index')
const expressJoi = require('@escook/express-joi')
exports.getArticleCate = (req,res)=>{
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql,(err,results)=>{
        if(err){
            res.cc(err)
        }else{
            res.send({
                status:0,
                message:'文章获取成功',
                data:results
            })
        }
    })
}
exports.addcates = (req,res)=>{
    const sql = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sql,[req.body.name,req.body.alias],(err,results)=>{
        if(err){
            res.cc(err)
        }else{
            if(results.length===2){
                res.cc('分类名称与别名被占用，请更换后重试！')
            }else if(results.length==1&&results[0].name === req.body.name){
                res.cc('分类名称被占用，请更换后重试')
            }else if(results.length==1&&results[0].alias === req.body.alias){
                res.cc('分类别名被占用，请更换后重试')
            }else{
                const sql = 'insert into ev_article_cate set ?'
                db.query(sql,[req.body],(err,results)=>{
                    if(err){
                        res.cc(err)
                    }else{
                        if(results.affectedRows!==1){
                            res.cc('新增文章分类失败')
                        }
                        else{
                            res.cc('新增文章分类成功！',0)
                        }
                    }
                })
            }
        }
    })
}
exports.deletecates = (req,res)=>{
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql,req.params.id,(err,results)=>{
        if(err){
            res.cc(err)
        }else{
            if(results.affectedRows!==1){
                res.cc('文章删除失败')
            }else{
                res.cc('文章删除成功',0)
            }
        }
    })
}
exports.getarticlebyid = (req,res)=>{
    const sql = 'select * from ev_article_cate where id = ?'
    db.query(sql,req.params.id,(err,results)=>{
        if(err){
            res.cc(err)
        }else{
            if(results.length!==1){
                res.cc('文章获取失败')
            }else{
                res.send({
                    status:0,
                    message:'文章获取成功',
                    data:results[0]
                })
            }
        }
    })
}
exports.updatecate = (req,res)=>{
    const sql = 'select * from ev_article_cate where id != ? and (name=? or alias=?)'
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,results)=>{
        if(err){
            res.cc(err)
        }else{
            if(results.length===2){
                res.cc('分类名称与别名被占用，请更换后重试！')
            }else if(results.length===1&&results[0].name==req.body.name){
                res.cc('分类名称被占用，请更换后重试')
            }else if(results.length===1&&results[0].alias==req.body.alias){
                res.cc('分类别称被占用，请更换后重试')
            }else{
                const sql = 'update ev_article_cate set ? where id=?'
                db.query(sql,[req.body,req.body.id],(err,results)=>{
                    if(err){
                        res.cc(err)
                    }else{
                        if(results.affectedRows!==1){
                            res.cc('文章更新失败')
                        }else{
                            res.cc({
                                status:0,
                                message:'文章更新成功',
                            })
                        }
                    }
                })
            }
        }
    })
}
exports.addarticles = (req,res)=>{
    res.send('ok')
}