// models/project.js
const { Schema, model } = require('mongoose');

/* sub‑document for the “next project” card */
const nextProjectSchema = new Schema({
  name:        String,
  description: String,
  link:        String
}, { _id:false });                 // don’t create an _id for this nested doc

/* main project structure  – mirrors your hard‑coded object */
const projectSchema = new Schema({
  slug:              { type:String, required:true, unique:true },
  projectName:       String,
  projectSubtitle:   String,
  projectDescription:String,
  projectImages:     [String],
  nextProject:       nextProjectSchema
});

module.exports = model('Project', projectSchema);
