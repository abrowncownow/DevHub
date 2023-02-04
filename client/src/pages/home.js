import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import { set } from "mongoose";
const SignedIn = Auth.loggedIn() ? true : false;
//comment
const Home = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);

  let projectData;

  if (data ? true : false) {
    projectData = data?.projects || {};
    //console.log(projectData)
  }

  useEffect(() => {

  }, [])
  return (
    <div className="container">
      {projectData ? (
        <ul>
          {projectData.map((project) => (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`}>
                <img alt="" src={project.image} id="thumbnail" />
                <p>{project.projectName}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Home;
