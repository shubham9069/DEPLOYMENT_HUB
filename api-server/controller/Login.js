const userCollection = require("../model/User");
const { githubAccessToken, getUserDetails } = require("../utils/GithubToken");

async function LoginGithub(req, res) {
  const { code } = req.query;
  try {
    const response = await githubAccessToken(code, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    const token_string = response.data?.split("&")[0].split("=")[1];

    if (token_string == "bad_verification_code") throw new Error(response.data);
    const userDataRes = await getUserDetails(token_string);

    if (userDataRes?.username) {
      var dbResponse = await userCollection.findOne({ username: userDataRes?.username });

      if (!dbResponse) {
        dbResponse = await userCollection.create(userDataRes);
      }
    }
    return res.json({
      status: "success", data: dbResponse, access_token: token_string,
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", message: err.message });
  }
}
module.exports = { LoginGithub };
