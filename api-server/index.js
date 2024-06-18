const express = require("express");
require("dotenv").config();

const { LoginGithub } = require("./controller/Login");
const {createProject, getAllProject, getProjectBySlug, getAllProjectwithUserData} = require("./controller/Project");
require('./connection/MongoDB')
require('./connection/Socketio')



const app = express();
const PORT = 80;
app.use(express.json());

app.get("/get-access-token", LoginGithub);

app.post("/create-project", createProject);
app.get("/all-project", getAllProject);
app.get("/project_by_slug/:project_slug", getProjectBySlug);
app.get("/all-project-userdetails", getAllProjectwithUserData);


app.get("/health-check", async function (req, res) {
 return res.json({ status: 200,message:"100 % working "})
});


app.listen(PORT, () => console.log(`Server Running..${PORT}`));
