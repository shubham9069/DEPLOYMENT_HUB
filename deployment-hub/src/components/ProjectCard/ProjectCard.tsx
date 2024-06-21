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
const ProjectCard = ({projectDetails}:any) => {
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
          <h4>{projectDetails?.project_slug}</h4>
          <Link href="" target='_blank' className="span-text">
            {projectDetails?.host_url}
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
        <Link href={projectDetails?.github_url} target='_blank' className="">
          {projectDetails?.github_url.substring(19,projectDetails?.github_url.length-4)}
        </Link>
      </div>

      <h4 className={`${style["create-project"]} text-zinc-500`}>
        Created On {new Date(projectDetails?.created_at).toLocaleDateString()}
      </h4>
      <div className={`flex gap-2 items-center ${style["branch-name"]}`}>
        <GitBranchPlus className="icon-style" />
        <p className="text-zinc-500">{projectDetails?.default_branch}</p>
      </div>
    </div>
  );
}

export default ProjectCard