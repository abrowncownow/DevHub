import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
const SignedIn = Auth.loggedIn() ? true : false;

const ProjectView = ({project, projectId}) => {

  const { loading, data } = useQuery(QUERY_ME, { 
    variables: { _id: project.projectCreator },
  });

  let username;
  if (data? true : false) {
    username = data?.username || {};
  }

  return (
    <div>
      <div className="container">
        <div>
          <h1>{project.projectName}</h1>
          <h4>Main Developer: {username}</h4>
          <img alt="" src={project.image} id="displayImage" />
          <div>
            <h2>{project.description}</h2>
          </div>
          <div>
            <Link to={project.discord} target="_blank">
              Discord Link
            </Link>
            <p> </p>
            <Link to={project.goFundMe} target="_blank">
              GoFundMe Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;