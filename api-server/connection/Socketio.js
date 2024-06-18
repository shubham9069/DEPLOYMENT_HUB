const { Server } = require("socket.io");

const io =new Server(9002,{
cors:{
    otigin:"*",
    credentials:true
}
}) 

io.on("connection", (socket) => {
    console.log(socket.id, "is connected");
    socket.on("subscribe", (channel) => {
        // channel == project_slug
        socket.join(channel);
        socket.emit("message", `Joined ${channel}`);
    });
});
module.exports={io}