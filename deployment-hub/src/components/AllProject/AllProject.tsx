'use client'
import React, { useContext } from "react";
import style from "./AllProject.module.css";
import AllProjectHeader from "./AllProjectHeader";
import ProjectCard from "../ProjectCard/ProjectCard";
import { AppContext } from "@/context/AppProvider";


const AllProject = () => {
  const { AllProject }:any = useContext(AppContext)

  return (
    <div className={style["All-project-container"]}>
      <AllProjectHeader />

      <div className={style["project-container"]}>
        { AllProject.length ? AllProject?.map((elem) => {
          return <ProjectCard key={elem?.project_slug} projectDetails={elem} />;
        }):
        <div>No Project Found </div>
        }
      </div>
    </div>
  );
};

export default AllProject;
