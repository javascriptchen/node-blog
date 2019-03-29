const redis = require('redis')

const client = redis.createClient(6379,'127.0.0.1');

client.on('error',err=>{
    console.error(err)
})

client.set('myname','zhangsan2',redis.print)
client.get('myname',(err,val)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('val:',val);
    client.quit()
})