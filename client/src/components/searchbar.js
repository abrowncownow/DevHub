import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS, QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom";
import SearchUsername from "./searchComponents/searchUsername";

const SearchBar = () => {

	const { data: projects } = useQuery(QUERY_PROJECTS)

	let [projectData, setProjectData] = useState([]);

	let allProjectData;

	if (projects ? true : false) {
		allProjectData = projects?.projects || {}
		//console.log(allProjectData)
	}

	function clearSearch(event) {
		setTimeout(function () {
			setProjectData([])
		}, 150)
	}
	function onChange(event) {
		const input = event.target.value.toLowerCase()

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
							<div key={project._id} className="result">
								<Link className="linkStyle" to={`/projects/${project._id}`}>
									<div><i>Project:</i> {project.projectName}</div>
									<SearchUsername projectCreator={project.projectCreator} />
									<div><i>Stars:</i> {project.stars}</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	)
}

export default SearchBar