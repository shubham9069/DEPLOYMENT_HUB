
import { http } from "./Http";

export async  function getAccessToken(code:string){
    try{
         const res = await http.post("/get-access-token?code="+code, {
           method: "GET",
           headers: {
             "content-type": "application/json",
           },
         }); 
         return res;
    }catch(e){
        console.log(e);
    }
}