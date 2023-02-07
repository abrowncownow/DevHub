import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { QUERY_ME, QUERY_PROJECTS } from "../../utils/queries";
import { CREATE_PROJECT } from "../../utils/mutations";
import * as mongoose from "mongoose";
import { useNavigate } from "react-router-dom";

const inputStyle = {
    display: "none"
}

const inputLink = {
    width: '300px'
}

const inputButton = {
    backgroundColor: 'darkblue',
    borderRadius: '5px',
    color: 'white'
}

const ProjectForm = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        image: null,
        file: null,
        title: "",
        description: "",
        discord: "",
        github: "",
    });

    const { title, description, file, image, discord, github } = input;

    const { loading, data } = useQuery(QUERY_ME);

    useQuery(QUERY_PROJECTS);

    const [createProject] = useMutation(CREATE_PROJECT);

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
        const githubLink = github.split('github.com')

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



        //github Bool
        let githubBool = false
        if (githubLink[0] === 'https://' || githubLink[0] === 'https://www.') {
            if (github && githubLink.length === 2) {
                githubBool = true
            }
        }
        if (github && !githubLink[0]) {
            githubBool = true
        }

        if (!github) {
            githubBool = true;
        }

        if (
            title.length !== 0 &&
            description.length !== 0 &&
            image !== null &&
            file !== null &&
            discordBool &&
            githubBool
        ) {
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

            const projectToSave = {
                _id: new mongoose.Types.ObjectId().valueOf(),
                projectName: title,
                description: description,
                image: imageUrl,
                projectCreator: userData._id,
                discord: discord,
                github: github,
                createdAt: `${Date.now()}`,
                stars: 0,
            };

            try {
                await createProject({
                    variables: { project: projectToSave },
                    update: (cache) => {
                        const { user } = cache.readQuery({ query: QUERY_ME });
                        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
                        cache.writeQuery({
                            query: QUERY_ME,
                            data: {
                                user: {
                                    ...user,
                                    created_projects: [
                                        ...user.created_projects,
                                        {
                                            __typename: "Projects",
                                            _id: projectToSave._id
                                        }

                                    ],
                                },
                            },
                        });


                        cache.writeQuery({
                            query: QUERY_PROJECTS,
                            data: {
                                projects:
                                    [
                                        {
                                            __typename: 'Project',
                                            _id: projectToSave._id,
                                            projectName: projectToSave.projectName,
                                            description: projectToSave.description,
                                            image: projectToSave.image,
                                            projectCreator: projectToSave.projectCreator,
                                            discord: projectToSave.discord,
                                            github: projectToSave.github,
                                            createdAt: Date(projectToSave.createdAt),
                                            stars: 0,
                                        },
                                        ...projects,
                                    ],
                            },
                        });
                    },
                });
                navigate('/')
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
                                title="image" style={inputStyle} />
                            <label id="imgInput" htmlFor="imgInput" style={inputButton}>Click me to upload image</label>
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
                    <div className="centerContent">
                        <input
                            type="text"
                            value={github}
                            style={inputLink}
                            onChange={onChange}
                            name="github"
                            placeholder="github"
                        />
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