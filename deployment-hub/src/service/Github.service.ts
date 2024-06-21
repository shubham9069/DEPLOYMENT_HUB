
import { http } from "./Http";

export async function getRepositories() {
  try {
    const res = await http.get("https://api.github.com/user/repos", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization:`Bearer ${localStorage.getItem('access_token')} `,
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}
