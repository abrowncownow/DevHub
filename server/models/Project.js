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
  goFundMe: {
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


//I needed this to test, this needs to be changed for final build
const Project = model('Project', projectSchema);

module.exports = Project;