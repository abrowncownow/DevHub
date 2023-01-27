import React, { useState, useEffect } from 'react';

const ProjectForm = () => {
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    function changeImage(event) {
        setImage(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    }

    async function onSubmit(event) {
        event.preventDefault()
        const data = await fetch("/s3url")
        const url = await data.json()
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file
        })
        const imageUrl = url.split('?')[0]
        console.log(imageUrl)
    }

    useEffect(() => {
    }, [])
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Project</h1>
                <div className="centerContent">
                    <input type="text" id="Title" placeholder="Project Title" />
                </div>
                <div className="row centerContent">
                    <div className="centerContent">
                        <input alt='' onChange={changeImage} type="file" id="imageInput" accept="image/png image/jpg" />
                    </div>
                    <img src={image} id="displayImage" />
                </div>
                <div className="centerContent">
                    <textarea type="text" id="postContent" placeholder="Enter a post content here..." cols="33"
                        rows="4"></textarea>
                </div>
                <div className="centerContent">
                    <button type="submit" id="creUp" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;