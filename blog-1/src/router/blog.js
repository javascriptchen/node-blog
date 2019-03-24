/*
 * @Author: chenchen 
 * @Date: 2019-03-24 15:22:42 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-24 22:47:04
 */
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {
  ErrorModel,
  SuccessModel
} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const data = getDetail(id)
    return new SuccessModel(data)
  }
  // 新建博客接口
  if (method === "POST" && req.path === "/api/blog/new") {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }
  // 更新博客接口
  if (method === "POST" && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel("更新博客失败")
    }
  }
  // 删除博客接口
  if (method === "POST" && req.path === "/api/blog/del") {
    const result = delBlog(id)
    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel("删除博客失败")
    }
  }
};

module.exports = handleBlogRouter;