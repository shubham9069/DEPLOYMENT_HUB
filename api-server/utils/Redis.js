const {subscriber }= require("../connection/Redis");
const {io}  = require("../connection/Socketio")


async function initRedisSubscribe() {
    console.log("Subscribed to logs....");
    subscriber.psubscribe(`logs:*`);
    subscriber.on("pmessage", (pattern, channel, message) => {
        io.to(channel).emit("message", message);
    });
}

module.exports ={initRedisSubscribe}