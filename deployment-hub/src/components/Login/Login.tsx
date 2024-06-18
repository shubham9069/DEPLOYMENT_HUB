"use client";
import { AppContext } from "@/context/AppProvider";
import { getAccessToken } from "@/service/Login.service";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

const Login = () => {
  const { token }: any = useContext(AppContext);
  const param: any = useSearchParams();


  function Login_GitHub(): void {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`
    );
  }

  async function getAccessTokenFromBackend(code: string) {
    const res = await getAccessToken(code);
    console.log(res);
  }

  useEffect(() => {
    const code: string = param.get("code");
    if (code) {
      getAccessTokenFromBackend(code);
    }
  }, [param]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-md shadow-md p-6 w-full m-8 max-w-80 bg-white">
        <p className="font-semibold text-xl ">Create Your Account</p>
        <span className="text-sm font-medium text-zinc-500 ">
          Signup using github account
        </span>

        <div
          className="flex gap-2 my-6 border cursor-pointer rounded-md p-2 w-36 mx-auto shadow-sm justify-center"
          onClick={Login_GitHub}
        >
          <Image
            src="/image/icon/github-icon.svg"
            width={18}
            height={18}
            alt="no-image"
          />
          <p className="text-sm font-medium">Github</p>
        </div>
        <p className="text-xs mt-14 text-center">Powered by @Shubham </p>
      </div>
    </div>
  );
};

export default Login;
