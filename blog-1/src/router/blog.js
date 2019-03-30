/*
 * @Author: chenchen 
 * @Date: 2019-03-24 15:22:42 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-03-30 17:56:42
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

const loginCheck = req => {
  console.log("req.session",req.session);
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    let author = req.query.author || '' // 作者
    const keyword = req.query.keyword || '' //title 模糊查询
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)

    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult
      }
      // 强制查询自己的文章
      author = req.session.username
    }

    const data = getList(author, keyword);
    return data.then(listData => {
      return new SuccessModel(listData)
    })
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新建博客接口
  if (method === "POST" && req.path === "/api/blog/new") {
    // const data = newBlog(req.body)
    // return new SuccessModel(data)

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    req.body.author = req.session.username // 假数据
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 更新博客接口
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    const result = updateBlog(id, req.body)
    return result.then(result => {
      if (result) {
        return new SuccessModel(result)
      } else {
        return new ErrorModel("更新博客失败")
      }
    })

  }
  // 删除博客接口
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    const author = req.session.username // 假数据
    const result = delBlog(id, author)
    return result.then(result => {
      if (result) {
        return new SuccessModel(result)
      } else {
        return new ErrorModel("删除博客失败")
      }
    })
  }
};

module.exports = handleBlogRouter;