const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;
    
    client.get(key, (err, data) => {
        if (err) throw err;
    
        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

module.exports = { client, cacheMiddleware };