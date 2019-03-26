/*
 * @Author: chenchen 
 * @Date: 2019-03-25 17:56:14 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-26 10:19:53
 */
const {
    exec
} = require('../db/mysql')
const login = (username, password) => {
    const sql = `select username , realname from users where username='${username}' and password='${password}'`
    return exec(sql).then(rows => {
        if(rows[0] == void 0){
            rows[0] = {}
        }
        return rows[0]
    })
}

module.exports = {
    login
}