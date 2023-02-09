import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_SAVED_PROJECTS } from "../utils/queries";
import { useProjectContext } from "../utils/globalState";
const SignedIn = Auth.loggedIn() ? true : false;

const SavedProject = () => {
  const [state, dispach] = useProjectContext()
  const { data: savedProjects, refetch } = useQuery(QUERY_SAVED_PROJECTS,{
    fetchPolicy: 'network-only'
  });
  let savedProjectsInfo
  if (savedProjects ? true : false) {
    savedProjectsInfo = savedProjects?.savedProjects || {};
    //console.log(savedProjects)
  }

  useEffect(()=> {
    refetch()
  })

  return (
    <div className="dropdown">
      <div className="dropbtn">Saved Project
        <i className="caret"></i>
      </div>
      <div className="dropdown-content">
        {savedProjects ? (
          <div>
            {savedProjectsInfo.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id}>
                <p>{project.projectName}</p>
              </Link>
            ))}
          </div>
        ) : (<div>Loading...</div>)}
      </div>
    </div>
  );
}

export default SavedProject;