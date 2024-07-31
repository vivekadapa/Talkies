const redis = require('redis');

let redisClient;

(async () => {
    redisClient = redis.createClient({
        password: process.env.REDIS_PASS,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });

    redisClient.on("error", (error) => console.error(`Redis Client Error: ${error.message}`));

    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.error(`Failed to connect to Redis: ${error.message}`);
    }
})();

module.exports = redisClient;
