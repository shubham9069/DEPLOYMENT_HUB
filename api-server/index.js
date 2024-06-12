const express = require("express");
const { containerBuilderServerJob } = require("./azurejob");
require("dotenv").config();
const Redis = require("ioredis");
const {Server} = require("socket.io");

const subscriber = new Redis(process.env.REDIS_SERVICE_URI);

const app = express();
const PORT = 9000;
app.use(express.json());

const io = new Server(9002, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on('connection',(socket) => {
  console.log(socket.id, "is connected");
  socket.on('subscribe',(channel) => {
    // channel == project_slug
    socket.join(channel);
    socket.emit("message", `Joined ${channel}`);

  })

})




app.post("/create-project", async function (req, res) {
  try {
    const { git_url, project_slug } = req.body;
    const response = await containerBuilderServerJob(git_url, project_slug);
    if (response.status != 200){
         return 
    }
    initRedisSubscribe()
    return res.json({
      status: "queued",
      data: { project_slug, url: `http://${project_slug}.localhost:8000` },
    });
  } catch (err) {
    return res.json({status: 'error', errors:err.message});
  }
});

async function initRedisSubscribe() {
  console.log("Subscribed to logs....");
  subscriber.psubscribe("logs:*");
  subscriber.on("pmessage", (pattern, channel, message) => {
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe()

app.listen(PORT, () => console.log(`Server Running..${PORT}`));
