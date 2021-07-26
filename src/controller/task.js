const Task = require('../models/tasks');
const slugify = require('slugify');
const shortid = require('shortid');
const Project = require('../models/project');

exports.createTask = (req,res) => {
      const taskObj = {
            name: req.body.name,
            desc: req.body.desc,
            status: req.body.status,
            project: req.body.project
      }
      console.log(req.body);
      const tasks = new Task(taskObj);
      tasks.save( (error, task) => {
            if(error) return res.status(400).json({error})
            if(task) return res.status(201).json({task})
      })
}
exports.updateTask = async (req,res) => {
      const taskObj = {
            name: req.body.name,
            desc: req.body.desc,
            status: req.body.status
      }
      const task = await Task.findOneAndUpdate({_id: req.body.id}, taskObj , { new: true});
      return res.status(201).json({task});
}
exports.initialData = async (req,res) => {
      const project = await Project.find({}).exec()
      const tasks = await Task.find({})
      .select('_id name project desc status')
      // .populate({path: 'project',select: '_id name'})
      .exec();
      res.status(200).json({
            project,
            tasks
      })
}

exports.deleteTask = async (req,res) => {
    const task = await Task.findOneAndDelete({_id: req.body._id});
    return res.status(200).json({message: 'Delete success'});
}