import React, { useState, useEffect } from "react";
//import { useMutation, useQuery } from "@apollo/client";
//const ObjectID = require("bson").ObjectID;
//import Auth from '../utils/auth';
//import { QUERY_ME } from '../utils/queries';
//import { QUERY_PROJECTS } from '../utils/queries';
//import { UPDATE_PROJECTS } from '../utils/mutations';

const ProjectForm = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    /*
      const { loading, data } = useQuery(QUERY_ME)
  
      const [updateProjects] = useMutation(UPDATE_PROJECTS);
  
      const [addProject] = useMutation(ADD_PROJECT)
      */

    function onChange(event) {
        if (event.target.id === "imageInput") {
            setImage(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
        }
        if (event.target.id === "titleInput") {
            setTitle(`${event.target.value}`);
        }
        if (event.target.id === "descriptionInput") {
            setDescription(`${event.target.value}`);
        }
    }

    async function onSubmit(event) {
        event.preventDefault();
        if (title.length !== 0 && description.length !== 0 && image !== null && file !== null) {
            const data = await fetch("/s3url");
            const url = await data.json();
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: file,
            });
            const imageUrl = url.split("?")[0];
            console.log(imageUrl);

            /*
            const projectToSave = {
                _id: new ObjectID(),
                projectName: title,
                description: description,
                image: imageUrl,
            };
            try {
                await updateProjects({
                    variables: { project: projectToSave },
                    update: (cache) => {
                        const { me } = cache.readQuery({ query: QUERY_ME });
                        cache.writeQuery({
                            query: QUERY_ME,
                            data: { me: { ...me, projects: [...me.projects, projectToSave] } },
                        });
                    },
                });
                await addProject({
                    variables: { project: projectToSave },
                    update: (cache) => {
                        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
                        cache.writeQuery({
                            query: QUERY_PROJECTS,
                            data: { projects: [...projects, projectToSave] },
                        });
                    },
                });
            } catch (err) {
                console.log(err);
            }
            */
        } else {
            alert('fill in all fields')
        }
    }

    useEffect(() => { }, []);

    //const token = Auth.loggedIn() ? Auth.getToken() : null;

    const SignedIn = true;
    //SignedIn = Auth.loggedIn() ? true : false;
    return (
        <div>
            {SignedIn ? (
                <form onSubmit={onSubmit}>
                    <h1>Project</h1>
                    <div className="centerContent">
                        <input
                            type="text"
                            value={title}
                            onChange={onChange}
                            id="titleInput"
                            placeholder="Project Title"
                        />
                    </div>
                    <div className="row centerContent">
                        <div className="centerContent">
                            <input
                                alt=""
                                onChange={onChange}
                                type="file"
                                id="imageInput"
                                accept="image/png image/jpg"
                            />
                        </div>
                        <img alt="" src={image} id="displayImage" />
                    </div>
                    <div className="centerContent">
                        <textarea
                            type="text"
                            value={description}
                            onChange={onChange}
                            id="descriptionInput"
                            placeholder="Enter a description"
                            cols="33"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="centerContent">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </form>
            ) : (
                <h2>Sign in to create a project</h2>
            )}
        </div>
    );
};

export default ProjectForm;
