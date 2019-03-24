/*
 * @Author: chenchen
 * @Date: 2019-03-24 15:22:47
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-24 16:18:02
 */
const querystring = require('querystring')
const handleUserRouter = require("./src/router/user");
const handleBlogRouter = require("./src/router/blog");

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 获取query
  req.query = querystring.parse(url.split('?')[1])

  // 处理blog路由
  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }
  // 处理user路由
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }
  // 未命中路由： 返回404
  res.writeHead(404, {
    "Content-type": "text/plain"
  });
  res.write("404 Not Found\n");
  res.end();
};

module.exports = serverHandle;