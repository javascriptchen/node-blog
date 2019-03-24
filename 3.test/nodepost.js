const http = require('http')
const server = http.createServer((req,res)=>{
    console.log(req.method);
    if(req.method === 'POST'){
        console.log('content-type:',req.headers['content-type']);
        let postData = ""
        req.on('data',chunk=>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            console.log(postData);
            res.end('hello world')
        })
    }
})

server.listen(8000)
console.log('ok');