const { Schema } = require('mongoose');

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  projectCreator: {
    type: String,
    required: true,
    trim: true,
  },
  discord: {
    type: String,
  },
  goFundMe: {
    type: String,
  }
});

module.exports = projectSchema;