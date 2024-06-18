const Redis = require("ioredis");

const subscriber = new Redis(process.env.REDIS_SERVICE_URI);

module.exports = {subscriber}