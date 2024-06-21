const userCollection = require("../model/User");
const { githubAccessToken, getUserDetails } = require("../utils/GithubToken");

async function LoginGithub(req, res) {
  const { code } = req.query;
  try {
    const response = await githubAccessToken(code, process.env.GIT_CLIENT_ID, process.env.GIT_CLIENT_SECRET);
    const token_string = response.data?.split("&")[0].split("=")[1];

    if (token_string == "bad_verification_code") throw new Error(response.data);
    const userDataRes = await getUserDetails(token_string);

    if (userDataRes?.username) {
      var dbResponse = await userCollection.findOne({ username: userDataRes?.username });

      if (!dbResponse) {
        dbResponse = await userCollection.create(userDataRes);
      }
    }
    // res.cookie('user_data', JSON.stringify(dbResponse), { maxAge: 900000, httpOnly: true });
    
    return res.json({
      status: "success", data: dbResponse, access_token: token_string,
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", message: err.message });
  }
}

async function getUserData(req, res) {
  const { user_id } = req.query
  try {
    let dbResponse = await userCollection.findOne({_id:user_id})
    return res.json({
      status: "success",
      data: dbResponse,
    });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }

}
module.exports = { LoginGithub, getUserData };
