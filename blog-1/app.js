/*
 * @Author: chenchen
 * @Date: 2019-03-24 15:22:47
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-03-29 17:10:33
 */
const querystring = require("querystring");
const handleUserRouter = require("./src/router/user");
const handleBlogRouter = require("./src/router/blog");
const { get, set } = require("./src/db/redis");

// cookie过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log("d.toGMTstring() is", d.toGMTString());
  return d.toGMTString();
};

// session数据
// const SESSION_DATA = {};

// 用于获取post data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({
        post: false
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
          postData: "false"
        });
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 获取query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").map(item => {
    if (!item) return;
    const arr = item.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  // // 解析session
  // let needSetCookie = false;
  // let userId = req.cookie.userid;
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   }
  // } else {
  //   needSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  // }
  // req.session = SESSION_DATA[userId];

  // 解析session（使用redis）
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化redis 中session的初始值
    set(userId, {});
  }
  req.sessionId = userId;
  get(req.sessionId)
    .then(sessionData => {
      if (!sessionData) {
        // 初始化redis 中session的初始值
        set(req.sessionId, {});
        // 设置session
        req.session = {};
      } else {
        req.session = sessionData;
      }
      console.log("req.session:", req.session);
      return getPostData(req);
    })
    .then(postData => {
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
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId};path='/';httpOnly;expires=${getCookieExpires()}`
            );
          }
          res.end(JSON.stringify(blogData));
        });
        return;
      }
      // 处理user路由
      // const userData = handleUserRouter(req, res);
      // if (userData) {
      //   res.end(JSON.stringify(userData));
      //   return;
      // }
      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId};path='/';httpOnly;expires=${getCookieExpires()}`
            );
          }
          res.end(JSON.stringify(userData));
        });
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
