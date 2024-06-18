import React from 'react'
import style from './Project.module.css'
import Image from "next/image";
import Link from "next/link";
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
import { Ellipsis, GitBranchPlus, Github } from "lucide-react";
const ProjectCard = () => {
  return (
    <div className={`${style["product-card"]} border rounded-md`}>
      <div className={`flex gap-2 ${style["project-card-top"]}`}>
        <Image
          src="/image/logo.png"
          width={30}
          height={30}
          alt="no-alt"
          className="object-contain"
        />
        <div className={style["text-content"]}>
          <h4>Shadow-ci-ui-example</h4>
          <Link href="" className="span-text">
            Shadow-ci-ui-exampleShadow-ci-ui-example
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="w-8 h-8 text-zinc-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="py-2">
              <span className="text-slate-600 text-sm">View Log</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <span className="text-slate-600 text-sm">Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2 highlight-text items-center my-4">
        <Github className="w-4 h-4 fill-black" />
        <Link href="" className="">
          shubham9069/LLM_AI_DOCS4
        </Link>
      </div>

      <h4 className={`${style["create-project"]} text-zinc-500`}>
        Created On 4 Oct
      </h4>
      <div className={`flex gap-2 items-center ${style["branch-name"]}`}>
        <GitBranchPlus className="icon-style" />
        <p className="text-zinc-500">Master</p>
      </div>
    </div>
  );
}

export default ProjectCard