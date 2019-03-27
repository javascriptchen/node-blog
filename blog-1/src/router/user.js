/*
 * @Author: chenchen
 * @Date: 2019-03-24 15:22:45
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-27 00:50:49
 */
const { login } = require("../controller/user");

const { ErrorModel, SuccessModel } = require("../model/resModel");
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log("d.toGMTstring() is", d.toGMTString());
  return d.toGMTString();
};
const handleUserRouter = (req, res) => {
  const method = req.method;
  // 登陆
  if (method === "GET" && req.path === "/api/user/login") {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        res.setHeader(
          "Set-Cookie",
          `username=${
            data.username
          };path='/';httpOnly;expires=${getCookieExpires()}`
        );
        return new SuccessModel(data);
      }
      return new ErrorModel("登录失败");
    });
  }

  // 登陆验证的测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.cookie.username) {
      return Promise.resolve(
        new SuccessModel({ username: req.cookie.username })
      );
    }
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

module.exports = handleUserRouter;
