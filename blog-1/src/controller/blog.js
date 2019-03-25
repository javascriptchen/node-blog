/*
 * @Author: chenchen 
 * @Date: 2019-03-24 16:23:56 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-25 18:25:10
 */
const {
  exec
} = require('../db/mysql')
const getList = (author, keyword) => {
  // 先返回假数据
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql)
};

const getDetail = id => {
  let sql = `select * from blogs where id=${id}`;
  return exec(sql).then(row => row[0])
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象 ，包含title,content属性
  return {
    id: 3 // 表示新建博客，插入到数据表的id
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = id => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};