const axios = require("axios");

async function githubAccessToken(code, client_id, client_secret) {
  const res = await axios.post(
    "https://github.com/login/oauth/access_token?client_id=" +
      client_id +
      "&client_secret=" +
      client_secret +
      "&code=" +
      code,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return res;
}
async function getUserDetails(token) {
  const {data} = await axios.get(" https://api.github.com/user", {
    headers: {
      "content-type": "application/json",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: "Bearer " + token,
    },
  });
   
  userData = {
    username: data.login,
    avatar_url: data.avatar_url,
    full_name: data.name,
  };
  return userData;
}

module.exports = { githubAccessToken, getUserDetails };
