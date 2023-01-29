const { gql } = require('apollo-server-express');

//I needed this to test
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    created_projects: [Project]!
    saved_projects: [Project]!
  }

  type Project  {
    _id: ID
    projectName: String,
    description: String,
    projectId: String,
    image: String,
    projectCreator: String
    discord: String
    goFundMe: String
  }

  input savedProject {
    projectName: String
    description: String
    projectId: String
    image: String
    projectCreator: String
    discord: String
    goFundMe: String
  }

  type Query {
    project: Project
    user: User
  }

  type Mutation {
    login(email: String!, password: String! ): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createProject(projectCreator: String!, projectDescription: String!): Project
    deleteProject(projectId: ID!): Project
    saveProject(input: savedProject!): User
    removeProject(projectId: ID!): User
  }

`;

module.exports = typeDefs