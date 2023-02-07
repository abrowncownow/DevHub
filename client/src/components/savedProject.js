import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SINGLE_PROJECT, QUERY_PROJECTS } from "../utils/queries";
const SignedIn = Auth.loggedIn() ? true : false;

const SavedProject = () => {

  // const { data: user } = useQuery(QUERY_ME);
  // const checkProj = user?.saved_projects?._id;

  // let saved_projects = [];
  // let userData;
  // if (user ? true : false) {
  //   userData = user?.user || {};
  //   // console.log(userData);

  //   for (let i=0; i<userData.saved_projects.length; i++){
  //     saved_projects.push(userData.saved_projects[i]._id)
  //   };
  //   console.log(saved_projects);
  // }

  // const { data: savedProjectData } = useQuery(QUERY_PROJECTS, 
  //   // {skip: !checkProj},
  //   {variables: { }});


  // // const { loading, data } = useQuery(
  // //   QUERY_PROJECTS, 
  // //   {variables: { _id: { $in : saved_projects} } }
  // //   );

  // let projectData;
  // console.log(savedProjectData);

  // if (savedProjectData ? true : false) {
  //   projectData = savedProjectData?.projects || {};
  //   console.log(projectData);
  // }

  return (
    <div className="dropdown">
      <div className="dropbtn">Saved Project
        <i className="caret"></i>
      </div>
      <div className="dropdown-content">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
      </div>
      {/* <div className="dropdown-content">
        {projectData.map((project) => (
          <a key={project._id}>
            <p>{projectData.projectName}</p>
          </a>
        ))}
      </div> */}
      {/* {savedProjects ? (

      )} */}
    </div>
  );
}

export default SavedProject;