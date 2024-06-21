"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "./CreateProject.module.css";
import { ChevronDown, Github, Plus, Search } from "lucide-react";
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
import Image from "next/image";
import { Button } from "../ui/button";
import { getRepositories } from "@/service/Github.service";
import { AppContext } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import { clone_template } from "@/DummyData";

const CreateProject = () => {
  const router = useRouter()
   const { synchronizeSetLoaderState,userData }: any =useContext(AppContext);
  const [allRepo, setAllRepo] = useState([]);
  const [searchRepo,setSearchRepo] = useState([])

  async function getRepo() {
synchronizeSetLoaderState(true)
    try {
      const res = await getRepositories();
      if (res?.data?.length) {
        const repoData = res.data.map((data) => {
          return {
            repo_name: data.name,
            clone_url: data.clone_url,
            default_branch: data.default_branch,
            language: data.language,
            repo_url: data?.full_name,
          };
        });
        setAllRepo(repoData);
        setSearchRepo(repoData)
      }
    } catch (err) {
      console.log(err);
    }
    finally{
      synchronizeSetLoaderState(false)
    }
  }

  function handleImport(project){
    router.push("/configure-project?project="+JSON.stringify(project));

  }

  function searchRepofn(val){ 
    if(!val){
       setSearchRepo(allRepo)
      return 
    }
    const arr = allRepo?.filter((repo)=>{
      return repo.repo_name.includes(val);
    })
    
    setSearchRepo(arr)

  }
  const debounce = (func)=>{
    let timer;
    return function (...args){
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, 500);
    }

  }


  const optimizedFn = useCallback(debounce(searchRepofn), []);
  

  useEffect(() => {
    if (!allRepo.length) {
      getRepo();
    }
  }, []);

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
                    <Image
                      src="/image/icon/github-icon.svg"
                      width={16}
                      height={16}
                      alt="github"
                    />
                    <p className="text-sm flex-1 font-medium">
                      {userData?.username}
                    </p>
                    <ChevronDown className="w-4 h-4 " />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex gap-2 items-center border rounded-md default-input">
                      <Image
                        src="/image/icon/github-icon.svg"
                        width={16}
                        height={16}
                        alt="github"
                      />
                      <p className="text-sm flex-1 font-medium">
                        {allRepo?.length} Repository
                      </p>
                    </div>
                  </DropdownMenuLabel>
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
                <input
                  className=" text-sm"
                  onChange={(e) => optimizedFn(e.target.value)}
                  placeholder="search project name"
                />
              </div>
            </div>
          </div>
          {/* repo container */}
          <div
            className={`border rounded-md divide-y max-h-80 overflow-y-auto `}
          >
            {searchRepo?.map((elem, i) => {
              return (
                <div
                  className="p-4 flex gap-2 items-center  "
                  key={elem?.repo_name}
                >
                  <Image
                    src="/image/logo.png"
                    alt="git logo "
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="flex-1 text-sm font-medium">
                    {elem?.repo_name}
                    <span className="text-zinc-500 text-xs font-normal">
                      · {elem?.default_branch}
                    </span>
                  </p>
                  <Button className="h-8" onClick={() => handleImport(elem)}>
                    Import
                  </Button>
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
            {clone_template?.map((item, i) => {
              return (
                <div
                  className="rounded-ml shadow-lg  max-w-44 cursor-pointer"
                  key={i}
                  onClick={() => handleImport(item)}
                >
                  <Image
                    src={item.img}
                    alt="template"
                    width={300}
                    height={150}
                    className=" w-full aspect-[4/3] rounded-t-ml"
                  />

                  <div className="flex gap-3 p-2 ">
                    <Image
                      src={item?.icon}
                      alt="template"
                      width={20}
                      height={19}
                    />
                    <p className="text-sm font-medium "> {item?.repo_name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreateProject;
