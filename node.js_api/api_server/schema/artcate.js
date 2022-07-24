//导入导入验证规则的包
const joi = require('joi')
//定义验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()
exports.add_cate_schema = {
    body:{
        name,
        alias
    }
}
exports.del_cate_schema = {
    params:{
        id
    }
}
exports.update_cate_schema = {
    body:{
        name,
        alias,
        id
    }
}