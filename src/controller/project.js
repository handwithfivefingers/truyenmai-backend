const slugify = require('slugify');
const shortid = require('shortid');
const Project = require('../models/project');

exports.createProject = (req,res) => {
  const projectObj = {
        name: req.body.name,
        desc: req.body.desc,
        type: req.body.type,
        progress: req.body.progress,
        slug: slugify(req.body.name).toLowerCase()
  }
  const project = new Project(projectObj);
  project.save((error,pro) => {

    if(error) return res.status(400).json({error});
    
    if(pro) {
      return res.status(201).json({pro})
    }
  });
  
//   return res.status(200).json({postImage});

}