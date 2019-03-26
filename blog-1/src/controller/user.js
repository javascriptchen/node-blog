/*
 * @Author: chenchen 
 * @Date: 2019-03-25 17:56:14 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-25 20:24:00
 */
const {
    exec
} = require('../db/mysql')
const loginCheck = (username, password) => {
    const sql = `select username , realname from users where username='${username}' and password='${password}'`
    return exec(sql).then(rows => {
        console.log('rows:',rows);
        return rows[0]
    })

}

module.exports = {
    loginCheck
}