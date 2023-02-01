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
      }
      saved_projects {
        _id
      }
    }
  }
`;

export const QUERY_PROJECTS = gql `
  {
    projects {
      _id
      projectName
      description
      image
      projectCreator
      discord
      goFundMe
      createdAt
      stars
    }
  }
`



export const QUERY_NEW_PROJECTS = gql`
  query NewProjects {
    newProjects {
      _id
      projectName
      description
      image
      projectCreator
      discord
      goFundMe
      createdAt
      stars
    }
  }
`

export const QUERY_POPULAR_PROJECTS = gql`
  query PopularProjects {
    popularProjects {
      _id
      projectName
      description
      image
      projectCreator
      discord
      goFundMe
      createdAt
      stars
    }
  }
`

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleProject($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      projectName
      description
      image
      projectCreator
      discord
      goFundMe
      createdAt
      stars
    }
  }
`
