const slugify = require('slugify');
const shortid = require('shortid');
const Project = require('../models/project');

exports.createProject = (req, res) => {
  const projectObj = {
    name: req.body.name,
    desc: req.body.desc,
    status: req.body.status,
    progress: req.body.progress,
    userOwner: req.body.userid,
    slug: slugify(req.body.name).toLowerCase() + '-' + shortid.generate()
  }
  const project = new Project(projectObj);
  project.save((error, item) => {
    if (error) return res.status(400).json({ error });
    if (item) {
      return res.status(201).json({ project: item })
    }
  });
}

exports.updateProject = async (req, res) => {
  const projectObj = {
    name: req.body.name,
    desc: req.body.desc,
    status: req.body.status,
    progress: req.body.progress,
    userOwner: req.body.userid
  }
  console.log(projectObj);
  const project = await Project.findOneAndUpdate({ _id: req.body.id }, projectObj, { new: true });
  return res.status(201).json({
    project
  })
}

exports.deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.body._id });
  return res.status(200).json({ message: 'Delete success' });
}
