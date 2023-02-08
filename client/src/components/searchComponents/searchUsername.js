import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS, QUERY_USER } from "../../utils/queries";
import { Link } from "react-router-dom";

const SearchUsername = ({ projectCreator }) => {

	const { data: singleUser } = useQuery(QUERY_USER, {
		variables: { userId: projectCreator }
	});

	let username;

	if (singleUser ? true : false) {
		username = singleUser.singleUser.username
	};

	return (<div><i>Creator:</i> {username}</div>);
}

export default SearchUsername;