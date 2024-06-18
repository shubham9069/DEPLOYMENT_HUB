import React from 'react'
import style from './CreateProject.module.css'
import { ChevronDown, Github, Plus, Search } from 'lucide-react';
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
import Image from 'next/image';
import { Button } from '../ui/button';

const CreateProject = () => {
  return (
    <div className={style["create-project-container"]}>
      <p className="font-semibold text-4xl "> Let's build something new.</p>
      <span className="text-sm font-medium text-zinc-500 ">
        To deploy a new Project, import an existing Git Repository or get
        started with one of our Templates.
      </span>

      <div className={`flex gap-4 my-20 max-w-5xl mx-auto max-lg:flex-col `}>
        {/* left div */}
        <div className="p-4 flex-1 bg-white border rounded-md shadow-2xl">
          <p className="font-semibold text-xl ">Import Git Repository</p>
          <div className="flex gap-2 my-3">
            <div className="w-2/4 max-sm:w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-2 items-center border rounded-md default-input">
                    <Github className="mr-2 icon-style" />
                    <p className="text-sm flex-1">Shubham9079</p>
                    <ChevronDown className="w-4 h-4 " />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem className="py-2">
                    <Github className="mr-2 icon-style" />
                    <span className="text-slate-600 text-sm">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2">
                    <Github className="mr-2 icon-style" />
                    <span className="text-slate-600 text-sm">Logout</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-2">
                    <Plus className="mr-2 icon-style" />
                    <span className="text-slate-600 text-sm">
                      Add project by Git url
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-2/4 max-sm:hidden">
              <div className=" flex-1 shadow-sm border flex-1 default-input flex gap-2 items-center">
                <Search className="icon-style" />
                <input className=" text-sm" placeholder="search project name" />
              </div>
            </div>
          </div>
          {/* repo container */}
          <div className={`border rounded-md divide-y `}>
            {[...Array(5)].map((elem) => {
              return (
                <div className="p-4 flex gap-2 items-center  ">
                  <Image
                    src="/image/logo.png"
                    alt="git logo "
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="flex-1 text-sm font-medium">
                    art gallery{" "}
                    <span className="text-zinc-500 text-xs font-normal">
                      · 4d ago{" "}
                    </span>
                  </p>
                  <Button className="h-8">import</Button>
                </div>
              );
            })}
          </div>

          <p className="text-sm  text-zinc-700 font-medium mt-5">
            Import Third-Party Git Repository →
          </p>
        </div>

        {/* right div  */}
        <div className="p-4 flex-1 border rounded-md shadow-2xl">
          <p className="font-semibold text-xl ">Clone Template</p>
          <div className="grid grid-cols-2 gap-3 my-4 w-fit mx-auto">
            {[...Array(4)]?.map((item) => {
              return (
                <div className="rounded-ml shadow-lg  max-w-44">
                  <Image
                    src="/image/nextjs.avif"
                    alt="template"
                    width={300}
                    height={150}
                    className=" w-full aspect-[4/3] rounded-t-ml"
                  />

                  <div className="flex gap-3 p-2 ">
                    <Image
                      src="/image/icon/next-icon.svg"
                      alt="template"
                      width={20}
                      height={19}
                    />
                    <p className="text-sm font-medium "> Next.js</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject