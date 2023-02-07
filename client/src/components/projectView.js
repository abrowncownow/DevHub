import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS, QUERY_USER, QUERY_SINGLE_PROJECT } from "../utils/queries";
import { SAVE_PROJECT, UNSAVE_PROJECT } from "../utils/mutations";
const SignedIn = Auth.loggedIn() ? true : false;

const ProjectView = ({ project, authEditor, toggleEdit }) => {

  const creatorId = project.projectCreator;
  const { loading, data: singleUser } = useQuery(
    QUERY_USER,
    {
      variables: { userId: creatorId },
    }
  );

  const { data } = useQuery(QUERY_ME);

  let savedProjectBool = false;

  const [saveProject] = useMutation(SAVE_PROJECT)

  const [unSaveProject] = useMutation(UNSAVE_PROJECT)

  let projectCreator;
  if (singleUser ? true : false) {
    projectCreator = singleUser?.singleUser || {};
    //console.log(project)
  }



  let currUser;
  if (data ? true : false) {
    currUser = data?.user || {};
    let checkProjectArr = currUser.saved_projects.filter((userSavedProject) => project._id === userSavedProject._id)
    if (checkProjectArr.length > 0) {
      savedProjectBool = true
    }
    //console.log(currUser)
  }


  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  //Format discord link
  const discordLink = project.discord.split("discord.com");
  let discordValue;
  if (discordLink[0] === "https://" || discordLink[0] === "https://www.") {
    if (project.discord && discordLink.length === 2) {
      discordValue = project.discord;
    }
  }
  if (project.discord && !discordLink[0]) {
    discordValue = `https://${project.discord}`;
  }

  //Format github link
  const githubLink = project.github.split("github.com");
  let githubValue;
  if (githubLink[0] === "https://" || githubLink[0] === "https://www.") {
    if (project.github && githubLink.length === 2) {
      githubValue = project.github;
    }
  }
  if (project.github && !githubLink[0]) {
    githubValue = `https://${project.github}`;
  }

  async function toggleSave() {
    const projectToSave = {
      _id: project._id,
      projectName: project.projectName,
      description: project.description,
      image: project.image,
      projectCreator: project.projectCreator,
      discord: project.discord,
      github: project.github,
      createdAt: `${project.createdAt}`,
      stars: project.stars,
    };

    let checkProjectArr = currUser.saved_projects.filter((userSavedProject) => project._id === userSavedProject._id)
    let setStars = project.stars + 1;
    if (checkProjectArr.length === 0) {
      await saveProject({
        variables: { project: projectToSave },
        update: (cache) => {
          const { user } = cache.readQuery({ query: QUERY_ME });
          const currProject = cache.readQuery({ query: QUERY_SINGLE_PROJECT }, { variables: { projectId: project._id } })
          cache.writeQuery({
            query: QUERY_ME,
            data: {
              user: {
                ...user,
                saved_projects: [
                  ...user.saved_projects,
                  {
                    __typename: "Project",
                    _id: projectToSave._id
                  }
                ],
              },
            },
          });
          cache.writeQuery({
            query: QUERY_SINGLE_PROJECT,
            data: {
              project: [
                {
                  ...project,
                  stars: setStars,
                }
              ],
            }
          });
          //console.log(user)
          //console.log(currProject)
        }
      })
    }
  }
  async function toggleUnSave() {
    const projectToSave = {
      _id: project._id,
      projectName: project.projectName,
      description: project.description,
      image: project.image,
      projectCreator: project.projectCreator,
      discord: project.discord,
      github: project.github,
      createdAt: `${project.createdAt}`,
      stars: project.stars,
    };
    let checkProjectArr = currUser.saved_projects.filter((userSavedProject) => project._id === userSavedProject._id)
    let setStars = project.stars - 1;
    if (checkProjectArr.length !== 0) {
      await unSaveProject({
        variables: { project: projectToSave },
        update: (cache) => {
          const { user } = cache.readQuery({ query: QUERY_ME });
          const newUserCache = user.saved_projects.filter((userSavedProject) => projectToSave._id !== userSavedProject._id)
          const currProject = cache.readQuery({ query: QUERY_SINGLE_PROJECT }, { variables: { projectId: project._id } })
          cache.writeQuery({
            query: QUERY_ME,
            data: {
              user: {
                ...user,
                saved_projects: [
                  ...newUserCache
                ],
              },
            },
          });
          cache.writeQuery({
            query: QUERY_SINGLE_PROJECT,
            data: {
              project: [
                {
                  ...project,
                  stars: setStars,
                }
              ],
            }
          });
          //console.log(user)
          //console.log(currProject)
        }
      })
    }
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
              <h4>Main Developer: {projectCreator.username}</h4>
              <img alt="" src={project.image} id="displayImage" />
              <div>
                <p>{project.description}</p>
              </div>
              <div  id="linkContainer">
                {project.discord ? (
                  <a href={discordValue} target="_blank" rel="noreferrer">
                    Discord Link
                  </a>
                ) : (
                  <p></p>
                )}
                <p> </p>
                {project.github ? (
                  <a href={githubValue} target="_blank" rel="noreferrer">
                    Github Page
                  </a>
                ) : (
                  <p></p>
                )}
              </div>
              {SignedIn ? (
                <div>
                  {!savedProjectBool ? (
                    <button className="btn" onClick={toggleSave}>
                      Favorite Project
                    </button>
                  ) : (
                    <button className="btn" onClick={toggleUnSave}>
                      Unfavorite Project
                    </button>
                  )}
                </div>
              ) : (
                <div>Sign in to save project</div>
              )}
            </div>
          </div>
          {authEditor ? (
            <button className="btn" onClick={toggleEdit}>
              Edit Page
            </button>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectView;
