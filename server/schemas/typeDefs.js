const { gql } = require('apollo-server-express');

//I needed this to test
const typeDefs = gql`
    type Project  {
    projectName: String,
    description: String,
    projectId: String,
    image: String,
    }

    type Query {
        project: Project
    }
`


module.exports = typeDefs