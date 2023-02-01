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
      goFundMe
      createdAt
      stars
    }
  }
`
