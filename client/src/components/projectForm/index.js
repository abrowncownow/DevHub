import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
//const ObjectID = require("bson").ObjectID;
import Auth from "../../utils/auth";
import { QUERY_ME } from "../../utils/queries";
//import { QUERY_PROJECTS } from '../utils/queries';
//import { UPDATE_PROJECTS } from '../utils/mutations';

const ProjectForm = () => {
    const [input, setInput] = useState({ image: null, file: null, title: '', description: '' })

    const { title, description, file, image } = input


    const { loading, data } = useQuery(QUERY_ME)


    let userData;
    if (data ? true : false) {
        userData = data?.user || {};
        console.log(userData)
    }

    /*
    const [updateProjects] = useMutation(UPDATE_PROJECTS);
 
    const [addProject] = useMutation(ADD_PROJECT)
    */

    function onChange(event) {
        const { name, value } = event.target;
        if (name === "image") {
            setInput(
                {
                    ...input,
                    image: URL.createObjectURL(event.target.files[0]),
                    file: event.target.files[0]
                }
            )
        }
        else {
            setInput(
                {
                    ...input,
                    [name]: value,
                }
            )
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

    const SignedIn = Auth.loggedIn() ? true : false;
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
                            name="description"
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
