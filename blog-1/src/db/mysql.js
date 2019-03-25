/*
 * @Author: chenchen 
 * @Date: 2019-03-25 17:56:20 
 * @Last Modified by:   chenchen 
 * @Last Modified time: 2019-03-25 17:56:20 
 */
const mysql = require('mysql')
const {
    MYSQL_CONF
} = require('../config/db')

// 创建con，不关闭，相当于一个单例模式，创建一次多次使用
const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result);
        });
    })
    return promise
}

module.exports = {
    exec
}