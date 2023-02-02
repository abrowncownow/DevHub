import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ProjectEdit from "../components/projectEdit";
import ProjectView from "../components/projectView";
import { QUERY_ME } from "../utils/queries";
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import Auth from "../utils/auth";
const SignedIn = Auth.loggedIn() ? true : false;

//data prop

const SingleProject = () => {
  let [authEditor, toggleAuthEditor] = useState(false);
  const [editMode, toggleEditMode] = useState(false);
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: {projectId: projectId},
  });
  let project;
  if (data ? true : false){
    project = data?.project || {};
  }
 
  let queryMe = useQuery(QUERY_ME);
  if ((data && queryMe) ? true : false){
    checkUsers()
  }
  async function checkUsers(){
    let currentUser = queryMe?.data || {};
      currentUser = currentUser.user;
    if (project.projectCreator === currentUser._id){
      authEditor = true;
      console.log(authEditor)
    }
    }


return(
  <div>
    {loading ? (
      <div>
      <span className="loader">Load&nbsp;ng</span>
      </div>
    ): (
      <div>
      {editMode ? (<ProjectEdit project={project} projectId = {projectId} />)
      :(<ProjectView project={project} projectId = {projectId} />)}
      </div>
      )}
            {authEditor ?(
        <button>Edit Page</button>):(
        <div></div>)}
  </div>
    );
};

export default SingleProject;