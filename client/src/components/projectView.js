import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
const SignedIn = Auth.loggedIn() ? true : false;

const ProjectView = (props) => {
    return (
      <div className="container">
        Project View
      </div>
    );
  };
  
  export default ProjectView;