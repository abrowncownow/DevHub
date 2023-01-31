const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Project, User } = require('../models')


//I needed this to test
const resolvers = {
    Query: {
        project: async function (parent, args, context) {
            if (context.user) {
                return await Project.findOne({ _id: context.project._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        newProjects: async () => {
            return Project.find().sort({ createdAt: -1 });
        },
        user: async function (parent, args, context) {
            if (context.user) {
                return await User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async function (parent, args) {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        createProject: async (parent, args) => {
            const project = await Project.create(args);
      
            await User.findOneAndUpdate(
              { username: args.username },
              { $addToSet: { created_projects: project._id } }
            );
      
            return project;
        },
        deleteProject: async (parent, args) => {
            return Project.findOneAndDelete({ _id: args});
        },
        saveProject: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const saveP = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { saved_projects: args.input } },
                { new: true }
            );
            return saveP;
        },
        removeProject: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const removeP = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { saved_projects: { projectId: args.projectId } } },
                { new: true }
            );
            return removeP;
        }
    },
}

module.exports = resolvers;