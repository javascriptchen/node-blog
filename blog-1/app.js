/*
 * @Author: chenchen
 * @Date: 2019-03-24 15:22:47
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-25 20:08:57
 */
const querystring = require("querystring");
const handleUserRouter = require("./src/router/user");
const handleBlogRouter = require("./src/router/blog");

// 用于获取post data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({
        "post": false
      });
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({
        "content-type": "false"
      });
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({
          "postData": "false"
        });
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise
};

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 获取query
  req.query = querystring.parse(url.split("?")[1]);

  getPostData(req).then(postData => {
    req.body = postData;
    // 处理blog路由
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      })
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
  });
};

module.exports = serverHandle;