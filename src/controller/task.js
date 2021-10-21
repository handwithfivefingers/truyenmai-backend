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

      // Find Task by Name, Desc & Project ID
      const task = await Task.find({
            "$and": [
                  {
                        "$or": [
                              { name: regex },
                              { desc: regex },
                        ],
                  },
                  { project: req.body.project },
            ]
      },
      ).select('_id name project desc status progress issue updatedAt ').exec();
      if (task) {

            // Filer Task by Date
            if (req.body.date !== undefined && req.body.date !== '') {
                  let returnTask = []
                  let newTask = []
                  newTask = task.filter(item => {
                        return item.updatedAt.getTime() >= Date.parse(req.body.date) ? item : ''
                  })
                  // more 1 filter for status 
                  if (req.body.status !== undefined && req.body.status !== '') {
                        returnTask = newTask.filter(item => {
                              return item.status == req.body.status ? item : ''
                        })
                        // return .... ( date -> status )
                        return res.status(200).json({
                              task: returnTask
                        })
                  }
                  // return .... ( date )
                  return res.status(200).json({
                        task: newTask
                  })
            } else if (req.body.status !== undefined && req.body.status !== '') {
                  let returnTask = task.filter(item => {
                        return item.status == req.body.status ? item : ''
                  })
                  return res.status(200).json({
                        task: returnTask
                  })
            } else {
                  // default ... 
                  return res.status(200).json({
                        task
                  })
            }

      } else return res.status(400).json({
            error: 'something went error'
      })

}

exports.getTaskDone = async (req, res) => {
      var newTask = 0;
      let xhtml = [];
      const project = await Project.find({
            "$and": [
                  { userOwner: req.body.id }
            ]
      }).select('_id').exec();
      if (project) {
            project.map(async (projectItem, index) => {
                  // const res = await checkTaskNumber(projectItem._id)
                  // try {
                  //       console.log(res)
                  // }
                  // finally {
                  //       console.log(res);
                  // }
                  xhtml.push(projectItem._id);
            })
            console.log(xhtml);
            try {
                  const data = await checkTaskNumber(xhtml);
                  if (data) {
                        console.log(data);
                  }
            }
            catch {
                  return res.status(400).json({
                        error: 'loi clgt'
                  })
            }
            finally {
                  return res.status(200).json({
                        taskDone: xhtml
                  })
            }

      } else return res.status(400).json({
            error: 'something went error'
      })

}

checkTaskNumber = async (arr) => {
      let newTask = 0;
      newTask = arr.map(async (id) => {
            let task = await Task.find({
                  "$and": [
                        { project: id },
                  ]
            },
            ).select('_id status').exec()
            if (task) newTask += task.filter(item => item.status === 2).length
      })
      return newTask
}