/*
 * @Author: chenchen 
 * @Date: 2019-03-24 15:22:45 
 * @Last Modified by:   chenchen 
 * @Last Modified time: 2019-03-24 15:22:45 
 */
const handleUserRouter = (req, res) => {
    const method = req.method;
  
    
    // 登陆
    if (method === "POST" && req.path === "/api/user/login") {
      return {
        msg: "登陆接口"
      };
    }
  };
  
  module.exports = handleUserRouter;
  