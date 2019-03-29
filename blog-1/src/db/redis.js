const redis = require("redis");
const { REDIS_CONF } = require("../config/db");

// 创建客户端, 不quit() 因为是单例模式
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
client.on("error", err => {
  console.error(err);
});

const set = (key, val) => {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  client.set(key, val, redis.print);
};

const get = key => {
  const promise = new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === void 0) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
      
    });
  });
  return promise;
};

module.exports = {
  set,
  get
};
