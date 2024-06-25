import { http } from "./Http";

export async function CreateProject(payload:any) {
  try {
    const res = await http.post("/create-project", payload,{
      headers: {
        "content-type": "application/json",
      },
    });
    return res;
  } catch (e) {
    alert(e.message);
    console.log(e);
  }
}
export async function getAllProject(user_id:any) {
  try {
    const res = await http.get("/all-project?user_id=" +user_id, {
      headers: {
        "content-type": "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}
