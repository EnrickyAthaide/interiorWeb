// models/project.js
const { Schema, model } = require('mongoose');

/* sub‑document for the "next project" card */
const nextProjectSchema = new Schema({
  name:        String,
  description: String,
  link:        String
}, { _id:false });                 // don't create an _id for this nested doc

/* main project structure  – mirrors your hard‑coded object */
const projectSchema = new Schema({
  slug:              { type: String, required: true, unique: true },
  projectName:       { type: String, required: true },
  projectSubtitle:   { type: String, required: true },
  projectDescription: { type: String, required: true },
  projectCategory:   { type: String, required: true, enum: ['residential', 'commercial', 'hospitality', 'retail'] },
  projectLocation:   { type: String, required: true },
  projectYear:       { type: Number, required: true },
  projectImages:     [String],
  features:          [String],
  nextProject:       nextProjectSchema,
  createdAt:         { type: Date, default: Date.now }
});

module.exports = model('Project', projectSchema);
