"use client";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import style from "./ConfigureProject.module.css";
import { ArrowLeft, CircleX, GitBranch, Plus } from "lucide-react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { CreateProject } from "@/service/Project.service";
import { AppContext } from "@/context/AppProvider";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { io } from "socket.io-client";
import LogTerminal from "./LogTerminal";
import Link from "next/link";

const socket = io("http://localhost:9002", {});

const ConfigureProject = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { userData, setAllProject }: any = useContext(AppContext);
  let project: any = useSearchParams().get("project");
  project = JSON.parse(project);
  const [projectState, setProjectState] = useState<"config" | "deploy" | "live">(
    "config"
  );

  const [projectDetails, setProjectDetails]: any = useState({
    project_slug: project?.repo_name,
    clone_url: project?.clone_url,
    default_branch: project?.default_branch,
    frame_work: "",
    build_foldername:"build",
  });

  const [command, setCommand]: any = useState({
    build_cmd: "npm run build",
    node_module_cmd: "npm install --force",
  });

  const [environmentVariables, setEnvironmentVariables] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  const [logArray, setLogArray] = useState([])

  function fieldAdd() {
    let copyArr = [...environmentVariables];
    copyArr[copyArr.length] = { name: "", value: "" };
    setEnvironmentVariables(copyArr);
  }
  function fieldRemove(index) {
    let copyArr = [...environmentVariables];
    copyArr.splice(index, 1);
    setEnvironmentVariables(copyArr);
  }

  function handleEnv(e, index) {
    let copyArr = [...environmentVariables];
    copyArr[index] = { ...copyArr[index], [e.target.name]: e.target.value };
    setEnvironmentVariables(copyArr);
  }
  function handleSelect(value){

    switch (value) {
      case "React.js":
        setProjectDetails({
          ...projectDetails,
          ["frame_work"]: value,
          build_foldername: "build",
        });
         setCommand({ ...command, build_cmd: "npm run build" });
        break;
      case "Next.js":
        setProjectDetails({
          ...projectDetails,
          ["frame_work"]: value,
          build_foldername: "out",
        });
         setCommand({ ...command, build_cmd: "npm run build" });
        break;
      case "Angular.js":
        setProjectDetails({
          ...projectDetails,
          ["frame_work"]: value,
          build_foldername: `dist/${project.repo_name}/browser`,
        });
        setCommand({ ...command,build_cmd:'ng build'});
        break;
    }
 
  }

  async function projectConfig() {
    let payload = {
      user_id: userData?._id,
      project_slug: projectDetails?.project_slug.trim().replaceAll(" ", "-"),
      clone_url: projectDetails?.clone_url,
      env: environmentVariables[0].name ? environmentVariables : [],
      branch_name: projectDetails?.default_branch,
      frame_work: projectDetails?.frame_work,
      node_module_cmd: command?.node_module_cmd,
      build_cmd: command?.build_cmd,
      build_foldername: projectDetails?.build_foldername,
      repo_url: project?.repo_url,
    };

    try {
      socket.emit("subscribe", `logs:${projectDetails?.project_slug}`);
     
      const res = await CreateProject(payload);

      if (res.data.data.azure_job_id) {
        setProjectState("deploy")
        setAllProject((prev)=>[...prev,res.data.data])
        toast({
          title: `Creating project`,
          description: `Your project job-id:- ${res.data.data.azure_job_id}`,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const stateClass: any = useMemo(() => {
    let obj = {};
    obj["step1"] = true;
    if (projectState == "config") {
      obj["step2"] = false;
      obj["step3"] = false;
    } else if(projectState == "deploy") {
      obj["step2"] = true;
      obj["step3"] = false;
    }else{
      obj["step2"] = true;
      obj["step3"] = true;
    }
    return obj;
  }, [projectState]);

  useEffect(() => {
    // event listen
    socket.on("message", (logs) => {
      console.log(logs);
      setLogArray((prev=>[...prev,JSON.parse(logs)]))
  })
  }, []);

 

  return (
    <div className={style["config-project"]}>
      <div
        className="flex gap-2 items-center mb-4 cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft className="icon-style" />
        <span className="text-slate-500 text-sm">Back</span>
      </div>
      <p className="font-semibold text-4xl ">You're almost done.</p>
      <span className="text-sm font-medium text-zinc-500 ">
        Please follow the steps to configure your Project and deploy it.
      </span>

      <div className={`flex  my-20 mx-auto max-lg:flex-col  `}>
        {/* left div  */}
        <div className="w-2/6 divide-y max-lg:w-full ">
          <div className="left-boxes h-32 p-8">
            <div className="border rounded-md bg-zinc-200 p-6 flex gap-4">
              <Image
                src="/image/icon/github-icon.svg"
                className="object-contain"
                width={24}
                height={24}
                alt="github"
              />
              <p className="font-medium">{project?.repo_name}</p>
            </div>
          </div>

          <div className="left-boxes h-42 p-8">
            <div className="flex items-center flex-col w-fit">
              <div
                className={`rounded-full w-2 h-2 ${
                  stateClass?.step1 && "bg-black"
                } relative`}
              >
                <p
                  className={`font-medium text-sm absolute w-max bottom-0 left-6`}
                  style={{ top: -8 }}
                >
                  Config Project
                </p>
              </div>
              <div
                className={`h-14 w-0.5 ${
                  stateClass?.step2 ? "bg-black" : "bg-zinc-200"
                }`}
              ></div>
              <div
                className={`rounded-full w-2 h-2 relative ${
                  stateClass?.step2 ? "bg-black" : "bg-zinc-200"
                }`}
              >
                <p
                  className={`${
                    stateClass?.step2 ? "text-black" : "text-zinc-500 "
                  } font-medium text-sm absolute w-max bottom-0 left-6`}
                  style={{ top: -8 }}
                >
                  Deploy
                </p>
              </div>
              <div
                className={`h-14 w-0.5 ${
                  stateClass?.step3 ? "bg-black" : "bg-zinc-200"
                }`}
              ></div>
              <div
                className={`rounded-full w-2 h-2 relative ${
                  stateClass?.step3 ? "bg-black" : "bg-zinc-200"
                }`}
              >
                <p
                  className={`${
                    stateClass?.step3 ? "text-black" : "text-zinc-500 "
                  } font-medium text-sm absolute w-max bottom-0 left-6`}
                  style={{ top: -8 }}
                >
                  Live
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
              <p className="font-medium text-sm">{project?.repo_url}</p>
            </div>
            <div className="flex gap-2 my-2">
              <GitBranch className="text-zinc-500 h-5 w-5" />
              <p className="font-medium text-zinc-500  text-sm">
                {project?.default_branch}
              </p>
            </div>
          </div>
        </div>
        {/* right div  */}
        <div className="bg-white border rounded-md shadow-xl p-8 w-3/5 max-lg:w-full">
          <p className="font-semibold text-xl mb-4">Configure Project</p>
          <hr />

          <div className="w-full">
            <div className="inputgroup my-4 ">
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Project Name
              </label>
              <input
                name="project_slug"
                value={projectDetails?.project_slug}
                disabled={stateClass["step2"]}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    [e.target.name]: e.target.value,
                  })
                }
                className="default-input border text-sm w-full"
                placeholder="project name ..."
              ></input>
            </div>
            <div className="inputgroup my-4 ">
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Framework name
              </label>
              <Select
                disabled={stateClass["step2"]}
                onValueChange={handleSelect}
              >
                <SelectTrigger className="w--full shadow-sm">
                  <SelectValue
                    placeholder="Select FrameWork"
                    className="font-medium text-sm placeholder:text-sm"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>FrameWork </SelectLabel>
                    <SelectItem value="React.js">React.js</SelectItem>
                    <SelectItem value="Next.js">Next.js</SelectItem>
                    <SelectItem value="Angular.js">Angular.js</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {projectDetails?.frame_work == "Next.js" && (
                <span className=" text-xs text-slate-600 font-medium">
                  Static export just be enable{" "}
                  <Link
                    href="https://nextjs.org/docs/app/building-your-application/deploying/static-exports"
                    className="text-blue-500 font-semibold"
                  >
                    Learn more
                  </Link>
                </span>
              )}
            </div>
            <div className="inputgroup my-4 ">
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Build Folder Name
              </label>
              <input
                name="build_foldername"
                value={projectDetails?.build_foldername}
                disabled={stateClass["step2"]}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    [e.target.name]: e.target.value,
                  })
                }
                className="default-input border text-sm w-full"
                placeholder="project name ..."
              ></input>
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
                        Install Command
                      </label>
                      <input
                        name="node_module_cmd"
                        disabled={stateClass["step2"]}
                        value={command.node_module_cmd}
                        onChange={(e) =>
                          setCommand({
                            ...command,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="default-input border text-sm w-full "
                        placeholder="npm install --force"
                      ></input>
                    </div>
                    <div className="inputgroup my-4 ">
                      <label className="text-xs font-medium text-zinc-700 block mb-1">
                        Build Command
                      </label>
                      <input
                        name="build_cmd"
                        disabled={stateClass["step2"]}
                        value={command.build_cmd}
                        onChange={(e) =>
                          setCommand({
                            ...command,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="default-input border text-sm w-full"
                        placeholder="npm run build"
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
                    {environmentVariables?.map((obj, i) => {
                      return (
                        <div className="flex gap-2 my-4">
                          <div className="inputgroup flex-1 ">
                            <label className="text-xs font-medium text-zinc-700 block mb-1">
                              key
                            </label>
                            <input
                              name="name"
                              disabled={stateClass["step2"]}
                              value={obj?.name}
                              onChange={(e) => handleEnv(e, i)}
                              className="default-input border text-sm w-full "
                              placeholder="EXAMPLE_NAME"
                            ></input>
                          </div>
                          <div className="inputgroup flex-1  ">
                            <label className="text-xs font-medium text-zinc-700 block mb-1">
                              value
                            </label>
                            <input
                              name="value"
                              disabled={stateClass["step2"]}
                              value={obj?.value}
                              onChange={(e) => handleEnv(e, i)}
                              className="default-input border text-sm w-full "
                              placeholder="BGYT^&^TGU(TG&"
                            ></input>
                          </div>
                          {i != environmentVariables.length - 1 ? (
                            <CircleX
                              className="self-center text-zinc-600 cursor-pointer mt-4"
                              onClick={() => fieldRemove(i)}
                            />
                          ) : (
                            <Plus
                              className="self-center text-zinc-600 cursor-pointer mt-4"
                              onClick={fieldAdd}
                            />
                          )}
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Button
              className="w-full"
              onClick={projectConfig}
              disabled={stateClass["step2"]}
            >
              Deploy
            </Button>
          </div>

          {stateClass["step2"] && (
            <LogTerminal
              logArray={logArray}
              projectState={projectState}
              setProjectState={setProjectState}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigureProject;
