import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import { Link } from "react-router-dom";



const SearchBar = () => {

    const { data: projects } = useQuery(QUERY_PROJECTS)


    let allProjectData;

    if (projects ? true : false) {
        allProjectData = projects?.projects || {}
    }

    function clearSearch(event) {
        setTimeout(function() {
            setProjectData([])
        }, 150)
    }

    let [projectData, setProjectData] = useState([])
    function onChange(event) {
        const input = event.target.value.toLowerCase()

        console.log(input)

        let searchData = allProjectData.filter((project) => {
            let check = ''

            for (let i = 0; i < input.length; i++) {
                check += project.projectName[i]
            }

            const isVisible = check === input
            if (isVisible && input.length !== 0) {
                return project
            }
            if (input.length === 0) {
                setProjectData([])
            }
        })

        setProjectData(searchData)
    }



    return (
        <div className="searchBox" onBlur={clearSearch}>
            {allProjectData ? (
                <div className="searchBox">
                    <input placeholder="Search Projects" onChange={onChange} onFocus={onChange} type="search" id="search" />
                    <div className="resultBox">
                        {projectData.map((project) => (
                            <div key={project._id} >
                                <Link to={`/projects/${project._id}`}>
                                    <div className="result">{project.projectName}</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default SearchBar