import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
const SignedIn = Auth.loggedIn() ? true : false;

const ProjectView = ({ project, authEditor, toggleEdit }) => {

  const { loading, data } = useQuery(
    //Change query for project user
    QUERY_ME, 
    //
    {
    variables: { _id: project.projectCreator },
  });

  let username;
  if (data ? true : false) {
    let user = data?.user || {};
    username = user.username
  }

  const linkStyle = {
    color: "white",
    textDecoration: 'none'
  }

  return (
    <div>
      {loading ? (
        <div>
          <span className="loader">Load&nbsp;ng</span>
        </div>
      ) : (
        <div key={project._id} style={linkStyle}>
          <div className="container">
            <div>
              <h1>{project.projectName}</h1>
              <h4>Main Developer: {username}</h4>
              <img alt="" src={project.image} id="displayImage" />
              <div>
                <h2>{project.description}</h2>
              </div>
              <div>
                {project.discord ? (
                  <Link to={project.discord} target="_blank">
                    Discord Link
                  </Link>
                ) : (
                  <p></p>
                )}
                  <p> </p>
                {project.goFundMe ? (
                  <Link to={project.goFundMe} target="_blank">
                    GoFundMe Page
                  </Link>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
          {authEditor ? <button className="btn" onClick={toggleEdit}>Edit Page</button> : <div></div>} 
        </div>
        
      )}
    </div>
  );
};

export default ProjectView;