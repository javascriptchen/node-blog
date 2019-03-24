/*
 * @Author: chenchen 
 * @Date: 2019-03-24 15:22:42 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-24 16:26:18
 */
const {
  getList,
  getDetail
} = require('../controller/blog')
const {
  ErrorModel,
  SuccessModel
} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
  }
  // 新建博客接口
  if (method === "POST" && req.path === "/api/blog/new") {
    return {
      msg: "这是新建博客接口"
    };
  }
  // 更新博客接口
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "这是更新博客接口"
    };
  }
  // 删除博客接口
  if (method === "POST" && req.path === "/api/blog/del") {
    return {
      msg: "这是删除博客接口"
    };
  }
};

module.exports = handleBlogRouter;