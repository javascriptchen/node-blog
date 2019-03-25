/*
 * @Author: chenchen 
 * @Date: 2019-03-24 15:22:45 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-25 16:54:17
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
    if (result) {
      return new SuccessModel(result)
    }else{
      return new ErrorModel("登录失败")
    }
  }
};

module.exports = handleUserRouter;