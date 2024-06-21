const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { LoginGithub } = require("./controller/Login");
const {createProject, getAllProject, getProjectBySlug, getAllProjectwithUserData} = require("./controller/Project");
const { Server } =require('socket.io');
const Redis  =require('ioredis');
require("dotenv").config();
require('./connection/MongoDB')

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
const PORT = 80;

const io =  new Server(9002, {
  cors: {
    otigin: "*",
    credentials: true
  }
})

const subscriber = new Redis(process.env.REDIS_SERVICE_URI);

  io.on("connection", (socket) => {
    console.log(socket.id, "is connected");
    socket.on("subscribe", (channel) => {
      // channel == project_slug
      socket.join(channel);
      socket.emit("message", JSON.stringify({log:`Joined ${channel}`}));
    });
    
  });
  
  async function initRedisSubscribe() {
  console.log("Subscribed to logs....");
  subscriber.psubscribe(`logs:*`);
  subscriber.on("pmessage", (pattern, channel, message) => {
    io.to(channel).emit("message", message);
  });
}



app.get("/get-access-token", LoginGithub);

app.post("/create-project", (req, res) => createProject(req, res, initRedisSubscribe));
app.get("/all-project", getAllProject);
app.get("/project_by_slug/:project_slug", getProjectBySlug);
app.get("/all-project-userdetails", getAllProjectwithUserData);


app.get("/health-check", async function (req, res) {
 return res.json({ status: 200,message:"100 % working "})
});


app.listen(PORT, () => console.log(`Server Running..${PORT}`));


