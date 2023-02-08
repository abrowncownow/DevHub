const { ObjectID } = require('bson');
const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  projectCreator: {
    type: ObjectID,
    required: true,
    trim: true,
  },
  discord: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
  },
  stars: {
    type: Number,
    default: 0,
  }
});

const Project = model('Project', projectSchema);

module.exports = Project;