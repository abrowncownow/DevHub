import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($project: ProjectInput!) {
    createProject(project: $project) {
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

export const UPDATE_PROJECT = gql`
  mutation updateProject($project: ProjectInput!) {
    updateProject(project: $project) {
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

export const SAVE_PROJECT = gql`
  mutation saveProject($project: ProjectInput!) {
    saveProject(project: $project) {
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

export const UNSAVE_PROJECT = gql`
  mutation unSaveProject($project: ProjectInput!) {
    unSaveProject(project: $project) {
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

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId) {
      _id
    }
  }
`
