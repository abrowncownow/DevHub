import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
const SignedIn = Auth.loggedIn() ? true : false;


const ProjectView = (props) => {
  const { loading, data } = useQuery(QUERY_PROJECTS);


  let projectData
  if (data ? true : false) {
    projectData = data?.projects || {};
    console.log(projectData);
  }
  return (
    <div className="container">
      Use console to view projects added to the cache
    </div>
  );
};

export default ProjectView;