import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    user {
      _id
      username
      email
      password
      created_projects {
        _id
        projectName
        description
        projectId
        image
        projectCreator
        discord
        goFundMe
      }
      saved_projects {
        _id
        projectName
        description
        projectId
        image
        projectCreator
        discord
        goFundMe
      }
    }
  }
`;