import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_PROJECTS, QUERY_USER, QUERY_USERS } from "../utils/queries";
import { UPDATE_PROJECT, DELETE_PROJECT } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  display: "none",
};

const inputLink = {
  width: '300px'
}

const inputButton = {
  backgroundColor: "darkblue",
  borderRadius: "5px",
  color: "white",
};

const ProjectEdit = ({ project, toggleEdit }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    image: project.image,
    file: null,
    title: project.projectName,
    description: project.description,
    discord: project.discord,
    goFundMe: project.goFundMe

  });


  const creatorId = project.projectCreator;

  const { title, description, file, image, discord, goFundMe } = input;

  const { loading, data } = useQuery(QUERY_ME);

  useQuery(QUERY_PROJECTS);

  const [updateProject] = useMutation(UPDATE_PROJECT);

  const [deleteProject] = useMutation(DELETE_PROJECT)

  let userData;

  if (data ? true : false) {
    userData = data?.user || {};
    //console.log(userData);
  }

  function onChange(event) {
    const { name, value } = event.target;
    if (name === "image") {
      setInput({
        ...input,
        image: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      });
      event.target.value = null;
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    const discordLink = discord.split('discord.com')
    const gofundmeLink = goFundMe.split('gofundme.com')


    //Discord Bool
    let discordBool = false;
    if (discordLink[0] === 'https://' || discordLink[0] === 'https://www.') {
      if (discord && discordLink.length === 2) {
        discordBool = true
      }
    }
    if (discord && !discordLink[0]) {
      discordBool = true
    }

    if (!discord) {
      discordBool = true;
    }



    //gofundme Bool
    let gofundmeBool = false
    if (gofundmeLink[0] === 'https://' || gofundmeLink[0] === 'https://www.') {
      if (goFundMe && gofundmeLink.length === 2) {
        gofundmeBool = true
      }
    }
    if (goFundMe && !gofundmeLink[0]) {
      gofundmeBool = true
    }

    if (!goFundMe) {
      gofundmeBool = true;
    }

    if (title.length !== 0 && description.length !== 0 && image !== null && discordBool && gofundmeBool) {
      let imageUrl;
      if (image !== project.image) {
        const data = await fetch("/s3url");
        const url = await data.json();
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: file,
        });
        imageUrl = url.split("?")[0];
        console.log(imageUrl);
      }

      if (image === project.image) {
        imageUrl = project.image;
      }

      const projectToSave = {
        _id: project._id,
        projectName: title,
        description: description,
        image: imageUrl,
        projectCreator: userData._id,
        discord: discord,
        goFundMe: goFundMe,
        createdAt: `${project.createdAt}`,
        stars: project.stars,
      };

      try {
        await updateProject({
          variables: { project: projectToSave },
          update: (cache) => {
            const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
            const updatedProjectCache = projects.filter(
              (singleProject) => singleProject._id !== projectToSave._id
            );

            cache.writeQuery({
              query: QUERY_PROJECTS,
              data: {
                projects: [
                  {
                    __typename: "Project",
                    _id: projectToSave._id.toString(),
                    projectName: projectToSave.projectName,
                    description: projectToSave.description,
                    image: projectToSave.image,
                    projectCreator: projectToSave.projectCreator,
                    discord: projectToSave.discord,
                    goFundMe: projectToSave.goFundMe,
                    createdAt: Date(projectToSave.createdAt),
                    stars: project.stars,
                  },
                  ...updatedProjectCache,
                ],
              },
            });
            toggleEdit();
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("fill in all fields");
    }
  }

  async function handleDelete() {
    await deleteProject({
      variables: { projectId: project._id },
      update: (cache) => {
        const { user } = cache.readQuery({ query: QUERY_ME });

        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });

        const upProjectCache = projects.filter((singleProject) => singleProject._id !== project._id);

        const upUserCreatedCache = user.created_projects.filter((singleProject) => {
          if (singleProject._id !== project._id) {
            return {
              __typename: "Projects",
              _id: singleProject._id
            }
          }
        }
        );
        const upUserSavedCache = user.saved_projects.filter((singleProject) => {
          if(singleProject._id !== project._id) {
            return {
              __typename: "Projects",
              _id: singleProject._id
            }
          }
        });
        //console.log(upUserCreatedCache)
        //console.log(upUserSavedCache)
        //console.log(upProjectCache)
        cache.writeQuery({
          query: QUERY_PROJECTS,
          data: {
            projects: [
              ...upProjectCache,
            ],
          },
        });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            user: {
              ...user,
              created_projects: [
                ...upUserCreatedCache
              ],
              saved_projects: [
                ...upUserSavedCache
              ]
            }
          },
        });
        navigate('/')
      }
    })
  }

  useEffect(() => { }, []);

  const SignedIn = Auth.loggedIn() ? true : false;
  return (
    <div className="container">
      {SignedIn ? (
        <form onSubmit={onSubmit} className="content">
          <h1>Project</h1>
          <div className="centerContent">
            <input
              type="text"
              value={title}
              style={inputLink}
              onChange={onChange}
              name="title"
              placeholder="Project Title"
            />
          </div>
          <div className="row centerContent">
            <div className="centerContent">
              <input
                alt=""
                onChange={onChange}
                type="file"
                name="image"
                id="imgInput"
                accept="image/png image/jpg"
                title="image"
                style={inputStyle}
              />
              <label id="imgInput" htmlFor="imgInput" style={inputButton}>
                Click me to upload image
              </label>
            </div>
            <img alt="" src={image} id="displayImage" />
          </div>
          <div className="centerContent">
            <textarea
              type="text"
              value={description}
              onChange={onChange}
              name="description"
              placeholder="Enter a description"
              cols="33"
              rows="4"
            ></textarea>
          </div>
          <div className="centerContent">
            <input
              type="text"
              value={discord}
              style={inputLink}
              onChange={onChange}
              name="discord"
              placeholder="Discord"
            />
          </div>
          <div className="centerContent inputLink">
            <input
              type="text"
              value={goFundMe}
              style={inputLink}
              onChange={onChange}
              name="goFundMe"
              placeholder="GoFundMe"
            />
          </div>
          <div className="centerContent">
            <button className="btn" onClick={toggleEdit}>Cancel</button>
            <button type="submit" className="btn btn-primary">Update</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </form>

      ) : (
        <h2>Sign in to create a project</h2>
      )}
    </div>
  );
};

export default ProjectEdit;
