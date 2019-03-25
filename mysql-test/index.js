const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
})

con.connect()
// const sql = 'select * from blogs'
// const sql = 'update blogs set author="李四2" where id=1'
const sql = "insert into users (username,`password`,realname) values('wangwu','123','王五')"

con.query(sql,(err,result)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(result);
});

con.end()