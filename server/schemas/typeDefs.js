const { gql } = require('apollo-server-express');

//I needed this to test
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    created_projects: [Project]
    saved_projects: [Project]
  }

  type Project  {
    _id: ID!
    projectName: String!
    description: String!
    image: String!
    projectCreator: ID!
    discord: String
    github: String
    createdAt: String
    stars: Int
  }

  type Auth {
    token: ID!
    user: User
}

  input ProjectInput {
    _id: ID!
    projectName: String!
    description: String!
    image: String!
    projectCreator: ID!
    discord: String
    github: String
    createdAt: String
    stars: Int
  }

  type Query {
    project(projectId: ID!): Project
    projects: [Project]
    newProjects: [Project]
    popularProjects: [Project]
    user: User
    users: [User]
    singleUser(userId: ID!): User
  }

  type Mutation {
    login(email: String!, password: String! ): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createProject(project: ProjectInput): Project
    updateProject(project: ProjectInput): Project
    saveProject(project: ProjectInput): Project
    unSaveProject(project: ProjectInput): Project
    deleteProject(projectId: ID!): Project
  }

`;

module.exports = typeDefs