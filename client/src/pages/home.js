import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import SearchBar from "../components/searchbar";
const SignedIn = Auth.loggedIn() ? true : false;

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);

  let projectData;

  if (data ? true : false) {
    projectData = data?.projects || {};
    console.log(projectData)
  }

  useEffect(() => { }, [])

  return (
    <div className="container">
      <div id="searchContainer">
        <SearchBar />
      </div>
      {projectData ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Project Title</th>
              <th>Project Description</th>
            </tr>
          </thead>
          <tbody>
            {projectData.map((project) => (
              <tr key={project._id}>
                <td><Link className="noStyle" to={`/projects/${project._id}`}><img alt="" src={project.image} id="thumbnail" /></Link></td>
                <td><Link className="noStyle" to={`/projects/${project._id}`}>{project.projectName}</Link></td>
                <td><Link className="noStyle" to={`/projects/${project._id}`}>{project.description}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Home;
