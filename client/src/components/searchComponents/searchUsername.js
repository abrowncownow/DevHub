import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

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