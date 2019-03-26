/*
 * @Author: chenchen 
 * @Date: 2019-03-24 15:22:45 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-25 23:09:01
 */
const {
  loginCheck
} = require('../controller/user')

const {
  ErrorModel,
  SuccessModel
} = require('../model/resModel')
const handleUserRouter = (req, res) => {
  const method = req.method;
  // 登陆
  if (method === "POST" && req.path === "/api/user/login") {
    const {
      username,
      password
    } = req.body;
    const result = loginCheck(username, password)
    return result.then(data => {
      if (data) {
        return new SuccessModel(data);
      }
      return new ErrorModel("登录失败")
    })
  }
};

module.exports = handleUserRouter;