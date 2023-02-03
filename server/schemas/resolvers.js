const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Project, User } = require('../models')


//I needed this to test
const resolvers = {
    Query: {
        project: async function (parent, { projectId }, context) {
            return await Project.findOne({ _id: projectId })
        },
        projects: async function () {
            return await Project.find();
        },
        /*
        newProjects: async () => {
            return Project.find().sort({ createdAt: -1 });
        },*/
        // Need to double check if this sort params is correct
        /*
        popularProjects: async () => {
            return Project.find().sort({ stars: 1 });
        },*/
        user: async function (parent, args, context) {

            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                return user
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        singleUser: async function (parent, { userId }) {
            return User.findOne({ _id: userId });
        }
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
        createProject: async (parent, { project }, context) => {
            if (context.user) {
                try {
                    const projectResponse = await Project.create(
                        {
                            ...project,
                            createdAt: Date(project.createdAt)
                        }
                    );
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { created_projects: projectResponse._id } }
                    );
                    return projectResponse;
                } catch (err) {
                    console.log(err)
                }
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateProject: async (parent, { project }, context) => {
            if (context.user) {
                try {
                    const projectResponse = await Project.findByIdAndUpdate({ _id: project._id },
                        {
                            ...project,
                            createdAt: Date(project.createdAt)
                        }
                    );
                    return projectResponse;
                } catch (err) {
                    console.log(err)
                }
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteProject: async (parent, args) => {
            return Project.findOneAndDelete({ _id: args });
        },
        saveProject: async (parent, { project }, context) => {
            if (context.user) {
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { saved_projects: project._id } },
                    );

                    let setStars = project.stars + 1;
                    const updateProject = await Project.findByIdAndUpdate(
                        { _id: project._id },
                        { $set: { stars: setStars } }
                    )
                    return updateProject
                } catch (err) {
                    console.log(err)
                }
            }
            throw new AuthenticationError("You need to be logged in!");

        },
        unSaveProject: async (parent, { project }, context) => {
            if (context.user) {
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { saved_projects: project._id } },
                    );

                    let setStars = project.stars - 1;
                    const updateProject = await Project.findByIdAndUpdate(
                        { _id: project._id },
                        { $set: { stars: setStars } }
                    )
                    return updateProject
                } catch (err) {
                    console.log(err)
                }
            }
            throw new AuthenticationError("You need to be logged in!");

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