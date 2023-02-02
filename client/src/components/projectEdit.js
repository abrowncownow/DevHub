import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import { UPDATE_PROJECT } from "../utils/mutations";

const inputStyle = {
  display: "none",
};

const inputButton = {
  backgroundColor: "darkblue",
  borderRadius: "5px",
  color: "white",
};

const ProjectEdit = ({ project }) => {
  const [input, setInput] = useState({
    image: project.image,
    file: null,
    title: project.projectName,
    description: project.description,

    //discord: project.discord,
    //goFundMe: goFundMe
    
  });

  const { title, description, file, image } = input;

  const { loading, data } = useQuery(QUERY_ME);

  useQuery(QUERY_PROJECTS);

  const [updateProject] = useMutation(UPDATE_PROJECT);

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
    if (title.length !== 0 && description.length !== 0 && image !== null) {
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

        //Set to input Box
        discord: project.discord,
        //discord: discord

        //Set to input Box
        goFundMe: project.goFundMe,
        //goFundMe: goFundMe

        createdAt: `${project.createdAt}`,
        stars: project.stars,
      };

      try {
        await updateProject({
          variables: { project: projectToSave },
          update: (cache) => {
            //const { user } = cache.readQuery({ query: QUERY_ME });

            const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
            const updatedProjectCache = projects.filter(
              (singleProject) => singleProject._id !== projectToSave._id
            );

            /*
            cache.writeQuery({
              query: QUERY_ME,
              data: {
                user: {
                  ...user,
                  created_projects: [
                    ...user.created_projects,
                    projectToSave._id,
                  ],
                },
              },
            });
            */

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
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("fill in all fields");
    }
  }

  useEffect(() => { }, []);

  const SignedIn = Auth.loggedIn() ? true : false;
  return (
    <div>
      {SignedIn ? (
        <form onSubmit={onSubmit} className="content">
          <h1>Project</h1>
          <div className="centerContent">
            <input
              type="text"
              value={title}
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      ) : (
        <h2>Sign in to create a project</h2>
      )}
    </div>
  );
};

export default ProjectEdit;
