const client = require('./redisClient');

const cacheMiddleware = (req, res, next) => {
    if(client.connected){
        const key = req.originalUrl || req.url;
        
        client.get(key, (err, data) => {
            if (err) throw err;
        
            if (data !== null) {
                res.send(JSON.parse(data));
            } else {
                next();
            }
        });    
    }
};

module.exports = { cacheMiddleware };