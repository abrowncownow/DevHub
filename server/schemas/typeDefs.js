const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    created_projects: [Project]!
    saved_projects: [Project]!
  }

  type Project {
    _id: ID
    projectName: String
    description: String
    projectId: String
    image: String
    projectCreator: User!
    discord: String
    goFundMe: String
  }

  input savedProject {
    projectName: String
    description: String
    projectId: String
    image: String
    projectCreator: User!
    discord: String
    goFundMe: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    project(username: String): [Project]
    project(projectId: ID!): Project
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(projectText: String!, projectCreator: String!): Project
    removeProject(projectId: ID!): Project
    saveProject(input: savedProject!): User
    removeProject(projectId: ID!): User
  }
`;

module.exports = typeDefs;