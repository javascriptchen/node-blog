/*
 * @Author: chenchen
 * @Date: 2019-03-24 15:22:45
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-03-28 01:01:38
 */
const {
  login
} = require("../controller/user");

const {
  ErrorModel,
  SuccessModel
} = require("../model/resModel");



const handleUserRouter = (req, res) => {
  const method = req.method;
  // 登陆
  if (method === "GET" && req.path === "/api/user/login") {
    const {
      username,
      password
    } = req.query;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // 同步到redis
        set(req.sessionId, req.session)
        return new SuccessModel(data);
      }
      return new ErrorModel("登录失败");
    });
  }

  // 登陆验证的测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      );
    }
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

module.exports = handleUserRouter;