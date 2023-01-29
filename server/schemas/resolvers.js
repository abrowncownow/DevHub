const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Project } = require('../models')


//I needed this to test
const resolvers = {
    Query: {
        project: async function (parent, args, context) {
            if (context.user) {
                return await Project.findOne({ _id: context.project._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    //Mutation: {},
}

module.exports = resolvers;