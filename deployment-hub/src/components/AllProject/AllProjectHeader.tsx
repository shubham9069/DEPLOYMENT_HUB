import React from "react";
import style from "./AllProject.module.css";
import { LayoutGrid, List, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import Link from "next/link";
const AllProjectHeader = () => {
  return (
    <div className={style["All-project-header"]}>
      <div className=" shadow-sm border flex-1 default-input flex gap-2 items-center">
        <Search className="icon-style" />
        <input className=" text-sm" placeholder="search project name" />
      </div>
      <div className="max-lg:hidden">
        <Select>
          <SelectTrigger className="w-[180px] shadow-sm">
            <SelectValue placeholder="Sort a project" className="font-bold" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        className={`shadow-md border rounded-md p-1 flex ${style["list-type"]} max-md:hidden `}
      >
        <div className="p-2 rounded-md">
          <LayoutGrid className="icon-style " />
        </div>
        <div className="p-2  rounded-md">
          <List className="icon-style " />
        </div>
      </div>

      <Button asChild>
        <Link href="/create-project">Add New Project</Link>
      </Button>
    </div>
  );
};

export default AllProjectHeader;
