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

export const QUERY_USERS = gql`
  {
    users {
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

export const QUERY_USER = gql`
  query SingleUser($userId: ID!) {
    singleUser(userId: $userId) {
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
      github
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
      github
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
      github
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
      github
      createdAt
      stars
    }
  }
`
