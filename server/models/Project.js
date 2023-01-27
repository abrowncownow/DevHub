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
});

module.exports = projectSchema;