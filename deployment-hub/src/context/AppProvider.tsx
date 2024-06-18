'use client'
import React, { useState } from 'react'
import { createContext } from "react"; 

export const AppContext:any = createContext(null)

export const AppProvider = ({children}:any) => {
  console.log(children)
    const [token,setToken]:any = useState()
  return (
    <AppContext.Provider value={{ setToken ,token}}>{children}</AppContext.Provider>
  );
}

