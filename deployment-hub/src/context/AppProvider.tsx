"use client";
import { getAllProject } from "@/service/Project.service";
import { rejects } from "assert";
import { resolve } from "path";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AppContext: any = createContext(null);

export const AppProvider = ({ children }: any) => {
  const [token, setToken]: any = useState();
  const [userData, setUserData]: any = useState({
    usernme: "",
    avatar_url: "",
    full_name: "",
    _id: "",
  });
  const [loaderState, setLoaderState]: any = useState(false);
  const [AllProject, setAllProject] = useState([]);

  function synchronizeSetLoaderState(state: boolean) {
    let elem = document.getElementById("loader");
    if (state) {
      elem.classList.add("flex");
      elem.classList.remove("hidden");
    } else {
      elem.classList.add("hidden");
      elem.classList.remove("flex");
    }
    setLoaderState(state);
  }

  async function getProject(user_id: string) {
    synchronizeSetLoaderState(true)
    try {
      const res = await getAllProject(user_id);
      if(res.data.data.length) {
        setAllProject(res.data.data)
      }
    } catch (e) {
      console.log(e);
    }
    finally{
      synchronizeSetLoaderState(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let  user_data:any = localStorage.getItem("user_data");
    user_data = JSON.parse(user_data);
    if (user_data && token) {
      setToken(token);
      setUserData(user_data);
      getProject(user_data?._id)
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        setToken,
        token,
        setUserData,
        userData,
        setLoaderState,
        loaderState,
        synchronizeSetLoaderState,
        setAllProject,
        AllProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
