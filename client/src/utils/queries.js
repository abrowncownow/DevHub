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
        createdAt
        stars
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
        createdAt
        stars
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      projectName
      description
      projectId
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
      projectId
      image
      projectCreator
      discord
      goFundMe
      createdAt
    }
  }
`
