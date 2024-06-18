import React from "react";
import style from "./ConfigureProject.module.css";
import {
  ArrowLeft,
  GitBranch,
  GitBranchPlus,
  Github,
  GithubIcon,
  LucideGithub,
  MoveLeft,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";

const ConfigureProject = () => {
  return (
    <div className={style["config-project"]}>
      <div className="flex gap-2 items-center mb-4">
        <ArrowLeft className="icon-style" />
        <span className="text-slate-500 text-sm">Back</span>
      </div>
      <p className="font-semibold text-4xl ">You're almost done.</p>
      <span className="text-sm font-medium text-zinc-500 ">
        Please follow the steps to configure your Project and deploy it.
      </span>

      <div className={`flex  my-20 mx-auto max-lg:flex-col  `}>
        <div className="w-2/6 divide-y max-lg:w-full ">
          <div className="left-boxes h-32 p-8">
            <div className="border rounded-md bg-zinc-200 p-6 flex gap-4">
              <Github className="fill-black" />
              <p className="font-medium">Deployment Hub</p>
            </div>
          </div>

          <div className="left-boxes h-32 p-8">
            <div className="flex items-center flex-col w-fit">
              <div className=" rounded-full w-2 h-2 bg-black relative">
                <p
                  className="font-medium text-sm absolute w-max bottom-0 left-6"
                  style={{ top: -8 }}
                >
                  Config Project
                </p>
              </div>
              <div className="h-14 w-0.5 bg-zinc-200"></div>
              <div className=" rounded-full w-2 h-2 bg-zinc-200 relative">
                <p
                  className=" text-zinc-500 font-medium text-sm absolute w-max bottom-0 left-6"
                  style={{ top: -8 }}
                >
                  Deploy
                </p>
              </div>
            </div>
          </div>
          <div className="left-boxes h-32 p-8">
            <p className="text-xs text-zinc-600 font-medium mb-4">
              GIT REPOSITORY
            </p>
            <div className="flex gap-2 my-2">
              <Image
                src="/image/icon/github-icon.svg"
                className="object-contain"
                width={18}
                height={18}
                alt="github"
              />
              <p className="font-medium text-sm">shubham9080/repourl</p>
            </div>
            <div className="flex gap-2 my-2">
              <GitBranch className="text-zinc-500 h-5 w-5" />
              <p className="font-medium text-zinc-500  text-sm">main</p>
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-md shadow-xl p-8 w-3/5 max-lg:w-full">
          <p className="font-semibold text-xl mb-4">Configure Project</p>
          <hr />

          <form className="w-full">
            <div className="inputgroup my-4 ">
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Project Name
              </label>
              <input
                className="default-input border text-sm w-full"
                placeholder="project name ..."
              ></input>
            </div>
            <div className="inputgroup my-4 ">
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Framework name
              </label>
              <Select>
                <SelectTrigger className="w--full shadow-sm">
                  <SelectValue
                    placeholder="Select FrameWork"
                    className="font-medium text-sm placeholder:text-sm"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>FrameWork </SelectLabel>
                    <SelectItem value="apple">React</SelectItem>
                    <SelectItem value="apple">React</SelectItem>
                    <SelectItem value="apple">React</SelectItem>
                    <SelectItem value="apple">React</SelectItem>
                    <SelectItem value="apple">React</SelectItem>
                    <SelectItem value="apple">React</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="my-4">
              <Accordion
                type="single"
                collapsible
                className="w-full border rounded-md px-4 active:border-black"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-normal text-zinc-700">
                    Build and Output Settings
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="inputgroup my-4 ">
                      <label className="text-xs font-medium text-zinc-700 block mb-1">
                        Build Command
                      </label>
                      <input
                        className="default-input border text-sm w-full"
                        placeholder="npm run build"
                      ></input>
                    </div>
                    <div className="inputgroup my-4 ">
                      <label className="text-xs font-medium text-zinc-700 block mb-1">
                        Install Command
                      </label>
                      <input
                        className="default-input border text-sm w-full "
                        placeholder="npm install --force"
                      ></input>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="my-4">
              <Accordion
                type="single"
                collapsible
                className="w-full border rounded-md px-4 active:border-black"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-normal text-zinc-700">
                    Environment Variables
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex gap-2 my-4">
                      <div className="inputgroup flex-1 ">
                        <label className="text-xs font-medium text-zinc-700 block mb-1">
                          key
                        </label>
                        <input
                          className="default-input border text-sm w-full "
                          placeholder="EXAMPLE_NAME"
                        ></input>
                      </div>
                      <div className="inputgroup flex-1  ">
                        <label className="text-xs font-medium text-zinc-700 block mb-1">
                          value
                        </label>
                        <input
                          className="default-input border text-sm w-full "
                          placeholder="BGYT^&^TGU(TG&"
                        ></input>
                      </div>
                      <Button className="self-end">Add</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Button className="w-full">Deploy</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfigureProject;
