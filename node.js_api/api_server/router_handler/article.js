//引入数据库
const db = require('../datebase/index')
//导入解析 formdata 格式表单数据的包
const multer = require('multer')
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
exports.addArticle = (req,res)=>{
    console.log(req.body) // 文本类型的数据 
    console.log('--------分割线----------') 
    console.log(req.file) // 文件类型的数据
    res.send('ok')
}