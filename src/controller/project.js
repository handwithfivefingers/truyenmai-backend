const slugify = require('slugify');
const shortid = require('shortid');
const Project = require('../models/project');
const User = require('../models/user');
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

exports.getallRequest = async (req, res) => {
  User.find({ _id: req.body._id })
    .exec((err, user) => {
      if (err) {
        return res.status(200).json({
          request: null
        })
      }
      if (user) {
        checkProj(user[0].request)
          .then(data => {
            return res.status(200).json({
              request: data
            })
          })
      }
    });
}

exports.acceptRequest = async (req, res) => {
  // Accept Project 
  // Project Model: userOwner chỉ 1 
  // UserAccess: có thể nhiều lên
  // Flow func -> nhận _id project, _id user -> Project Model -> add _id user vào userAccess
  // Xóa request
  const { id } = req.params;
  const userid = req.body.userId;
  Project.updateOne({ _id: id },
    { $push: { userAccess: { $each: [userid] } } }
    , { new: true })
    .exec(async (err, project) => {
      if (err) return res.status(200).json({ error: err })
      if (project) {
        User.updateOne({ _id: userid },
          { '$pull': { "request": id } }
          ,
          { new: true }
          ,
          async (err, user) => {
            if (user) return res.status(200).json({ success: true })
            if (err) return res.status(200).json({ error: err })
          })
      }
    })
}

exports.refuseRequest = async (req, res) => {
  const { id } = req.params;
  const userid = req.body.userId;
  User.updateOne({ _id: userid },
    { '$pull': { "request": id } }
    ,
    { new: true }
    ,
    async (err, user) => {
      if (user) return res.status(200).json({ success: true })
      if (err) return res.status(200).json({ error: err })
    })
}
checkProj = (requestOwner) => {
  let allProject = requestOwner.map(item => Project.find({ _id: item }).select("_id name").then(resp => resp[0]))
  return Promise.all(allProject)
}