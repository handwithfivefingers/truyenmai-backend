const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const multiparty = require('connect-multiparty');
const multipartMiddleware = multiparty();
const path = require('path');
const bodyParser = require('body-parser');
// const {upload} = require('./common-middleware/index');


//Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');
// Setup environment
env.config();

// Setup database
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@todo1242021.hehew.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
).then(() => {
  console.log('DB connected');
});


// mongodb config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);

// middleware

app.use(express.json());
// app.use(express.urlencoded({extended:false}))
// app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());


// Routes middleware
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', projectRoutes);
app.use('/api', taskRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/uploads', multipartMiddleware, function (req, res) {
  var fs = require('fs');
  fs.readFile(req.files.upload.path, function (err, data) {
    var newPath = __dirname + '/uploads/' + req.files.upload.name;
    fs.writeFile(newPath, data, function (err) {
      if (err) console.log({ err: err });
      else {
        html = "";
        html += "<script type='text/javascript'>";
        html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
        html += "    var url     = \"/uploads/" + req.files.upload.name + "\";";
        html += "    var message = \"Uploaded file successfully\";";
        html += "";
        html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
        html += "</script>";
        console.log(res.query);
        res.send(html);
      }
    });
  });
});

// App run
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});