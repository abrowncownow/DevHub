import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ProjectEdit from "../components/projectEdit";
import ProjectView from "../components/projectView";

import { QUERY_SINGLE_PROJECT } from '../utils/queries';



//data prop

const SingleProject = () => {

  const [editMode, toggleEditMode] = useState(false);
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: {projectId: projectId},
  });

  const project = data?.project || {};
  console.log(projectId);
  console.log(project);
  if (loading) {
    return <div>
      <span class="loader">Load&nbsp;ng</span>
    </div>;
  }

return(
  <div>
  {editMode ? (
    <ProjectEdit project={project} projectId = {projectId} />
  ):(
    <ProjectView project={project} projectId = {projectId} />
  )}
  </div>
  );
};

export default SingleProject;