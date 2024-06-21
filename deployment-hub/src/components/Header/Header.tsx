import React, { useContext } from 'react'
import style from './Header.module.css'
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, CreditCard, LogOut, User } from 'lucide-react';
import { AppContext } from '@/context/AppProvider';

const Header = () => {
  const {userData}:any = useContext(AppContext)
  return (
    <div className={`${style["header-container"]} max-md:justify-between `}>
      {/* left  */}
      <img src="/image/logo.png" alt="logo" className="h-12 w-12"></img>

      {/* mid  */}
      <div className=" flex-1 max-md:hidden  ">
        <Link
          href="/ese"
          className="flex sm:flex-row sm:items-center text-sm font-medium leading-none flex items-center gap-4 rounded-xl border px-1 py-2 w-fit flex-col items-start justify-between cursor-pointer "
        >
          <img src="/image/logo.png" alt="logo" className="h-6 w-6"></img>
          <span className="">{userData.username}</span>
          <span className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">
            Feature
          </span>{" "}
        </Link>
      </div>

      {/* right  */}
      <div className=" flex gap-4 items-center  ">
        <Link href="" className="text-slate-500 text-sm">
          Help
        </Link>
        <Link href="" className="text-slate-500 text-sm">
          Documentation
        </Link>
        <Link href="" className="text-slate-500 text-sm">
          Channel
        </Link>
        <Link href="" className="text-slate-500 text-sm">
          <div className="border p-2 rounded-full  ">
            <Bell className="icon-style" />
          </div>
        </Link>

        {/* //Avavtar  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src={userData.avatar_url}
              className="h-10 w-10 rounded-full cursor-pointer"
            ></img>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <div>
                <h4>{userData.full_name}</h4>
                <Link 
                  href={`https://github.com/${userData.username}`}
                  className="text-slate-600 text-xs hover:underline"
                  target="_blank"
                >
                  {`github.com/${userData.username}`}
                </Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2">
              <User className="mr-2 icon-style" />
              <span className="text-slate-600 text-sm">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <LogOut className="mr-2 icon-style" />
              <span className="text-slate-600 text-sm">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header