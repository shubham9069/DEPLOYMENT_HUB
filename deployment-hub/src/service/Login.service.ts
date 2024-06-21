
import { http } from "./Http";

export async  function getAccessToken(code:string){
    try{
         const res = await http.get("/get-access-token?code=" + code, {
           headers: {
             "content-type": "application/json",
             withCredntials: true,
             credentials: "include",
           },
         }); 
         console.log(res)
         return res;
    }catch(e){
        console.log(e);
    }
}