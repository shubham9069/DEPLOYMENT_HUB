import React from "react";
import style from "./AllProject.module.css";
import AllProjectHeader from "./AllProjectHeader";
import ProjectCard from "../ProjectCard/ProjectCard";


const AllProject = () => {
  return (
    <div className={style["All-project-container"]}>
      <AllProjectHeader />

      <div className={style["project-container"]}>
       {[...Array(4)]?.map((elem)=>{
        return <ProjectCard />
       })}
      </div>
    </div>
  );
};

export default AllProject;
