import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ProjectEdit from "../components/projectEdit";
import ProjectView from "../components/projectView";

import { QUERY_SINGLE_PROJECT } from '../utils/queries';

const [editMode, toggleEditMode] = useState(false);

//data prop

const SingleProject = () => {

  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: {projectId: projectId},
  });

  const project = data?.project || {};

  if (loading) {
    return <div>
      <span class="loader">Load&nbsp;ng</span>
    </div>;
  }

return(
  <div>
  {editMode ? (
    <ProjectEdit projectId = {projectId} />
  ):(
    <ProjectView projectId = {projectId} />
  )}
  </div>
  );
};

export default SingleProject;