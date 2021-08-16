const Task = require('../models/tasks');
const slugify = require('slugify');
const shortid = require('shortid');
const Project = require('../models/project');

exports.createTask = (req, res) => {
      const taskObj = {
            name: req.body.name,
            desc: req.body.desc,
            status: req.body.status,
            project: req.body.project,
            issue: req.body.issue,
            progress: req.body.progress,
      }
      const tasks = new Task(taskObj);
      tasks.save((error, task) => {
            if (error) return res.status(400).json({ error })
            if (task) return res.status(201).json({ task })
      })
}
exports.updateTask = async (req, res) => {
      const taskObj = {
            name: req.body.name,
            desc: req.body.desc,
            status: req.body.status,
            issue: req.body.issue,
            progress: req.body.progress
      }
      const task = await Task.findOneAndUpdate({ _id: req.body.id }, taskObj, { new: true });
      return res.status(201).json({ task });
}
exports.initialData = async (req, res) => {
      const userID = req.body.id;
      const project = await Project.find({
            "$and": [
                  { userOwner: userID }
            ]
      }).exec()
      return res.status(200).json({
            project,
      })
}
exports.deleteTask = async (req, res) => {
      const task = await Task.findOneAndDelete({ _id: req.body._id });
      return res.status(200).json({ message: 'Delete success' });
}

exports.searchTask = async (req, res) => {
      const regex = new RegExp(req.body.search, 'i');
      const projectregex = new RegExp(req.body.project, 'i');
      const task = await Task.find({
            "$and": [
                  { name: regex },
                  { project: req.body.project }
            ]
      }).select('_id name project desc status progress issue').exec();
      return res.status(200).json({
            task
      })
}