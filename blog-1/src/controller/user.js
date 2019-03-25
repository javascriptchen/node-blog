/*
 * @Author: chenchen 
 * @Date: 2019-03-25 17:56:14 
 * @Last Modified by:   chenchen 
 * @Last Modified time: 2019-03-25 17:56:14 
 */
const loginCheck = (username, password) => {
    if (username === "zhangsan" && password === "123") {
        return true
    } else {
        return false
    }
}

module.exports = {
    loginCheck
}