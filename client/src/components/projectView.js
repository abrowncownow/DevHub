import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
const SignedIn = Auth.loggedIn() ? true : false;


const ProjectView = (props) => {
  return (
    <div className="container">
      This is project view
    </div>
  );
};

export default ProjectView;