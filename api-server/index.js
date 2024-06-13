const express = require("express");
const { containerBuilderServerJob, genrateAccessToken } = require("./azurejob");
require("dotenv").config();
const Redis = require("ioredis");
const { Server } = require("socket.io");

const subscriber = new Redis(process.env.REDIS_SERVICE_URI);

const app = express();
const PORT = 80;
let ACCESS_TOKEN = process.env.ACCESS_TOKEN;
app.use(express.json());

const io = new Server(9002, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "is connected");
  socket.on("subscribe", (channel) => {
    // channel == project_slug
    socket.join(channel);
    socket.emit("message", `Joined ${channel}`);
  });
});

app.post("/create-project", async function (req, res) {
  try {
    const { git_url, project_slug } = req.body;
    const response = await containerBuilderServerJob(
      git_url,
      project_slug,
      ACCESS_TOKEN
    );
    if (response?.message == "ExpiredAuthenticationToken") {
      const accessTokenResponse = await genrateAccessToken();

      if (accessTokenResponse.status != 200) {
        return res.status(500).json({ status: "error", errors: 'token not genrate' });
      }

        ACCESS_TOKEN = accessTokenResponse.data.access_token;
        const jobResponse = await containerBuilderServerJob(
          git_url,
          project_slug,
          ACCESS_TOKEN
        );

        if (jobResponse.status != 200) return res.status(400).json({ status: "error", errors: "error " });
      
    }

    initRedisSubscribe(project_slug);
    return res.json({
      status: "queued",
      data: {
        project_slug,
        url: `http://${project_slug}.localhost:8000`,
        job_id: response?.data?.name,
      },
    });
  } catch (err) {
    return res.json({ status: "error", errors: err.message });
  }
});
app.get("/health-check", async function (req, res) {
 return res.json({ status: 200,message:"100 % working "})
});

async function initRedisSubscribe() {
  console.log("Subscribed to logs....");
  subscriber.psubscribe(`logs:*`);
  subscriber.on("pmessage", (pattern, channel, message) => {
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe();

app.listen(PORT, () => console.log(`Server Running..${PORT}`));
