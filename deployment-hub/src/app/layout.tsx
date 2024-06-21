'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AppProvider } from "@/context/AppProvider";
import Loader from "@/components/ui/loader";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(()=>{
    
    let user_data:any  = localStorage.getItem("user_data");
    user_data = JSON.parse(user_data)
    if (user_data){

      router.push( pathname == '/' ? `/${user_data?.username}` : pathname);
    }else{
      router.push(`/login`)
    }
  
  },[])
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header />
          {children}
          <Footer />
          <Loader />
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
