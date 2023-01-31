import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
const SignedIn = Auth.loggedIn() ? true : false;

const ProjectEdit = (props) => {
    return (
      <div className="container">
        This is project edit
      </div>
    );
  };
  
  export default ProjectEdit;