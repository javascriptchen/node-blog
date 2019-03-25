/*
 * @Author: chenchen 
 * @Date: 2019-03-25 17:56:09 
 * @Last Modified by:   chenchen 
 * @Last Modified time: 2019-03-25 17:56:09 
 */
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if (env === 'dev') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'myblog'
	}
}

if (env === 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'myblog'
	}
}

module.exports = {
	MYSQL_CONF
}