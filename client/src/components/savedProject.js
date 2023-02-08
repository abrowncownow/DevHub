import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_SAVED_PROJECTS} from "../utils/queries";
const SignedIn = Auth.loggedIn() ? true : false;

const SavedProject = () => {

  const { data: savedProjects } = useQuery(QUERY_SAVED_PROJECTS);

  let savedProjectsInfo
  if (savedProjects ? true : false) {
    savedProjectsInfo = savedProjects?.savedProjects || {};
    // console.log(savedProjects)
  }

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