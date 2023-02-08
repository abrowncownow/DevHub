import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'

const projectContext = createContext();

const ProjectProvider = (props) => {
  const [state, dispatch] = useProductReducer({
    saved_projects: []
  });

  return (
  <projectContext.Provider value={[state, dispatch]}> 
  {props.children} 
  </projectContext.Provider>)
};


const useProjectContext = () => {
  return useContext(projectContext);
};

export { ProjectProvider, useProjectContext };