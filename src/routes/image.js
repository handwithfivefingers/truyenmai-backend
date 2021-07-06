const express = require('express');
const { createPost } = require('../controller/post');
const router = express.Router();
const shortid = require('shortid');
// const {upload} = require('./../common-middleware/index');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// router.post('/', upload.single('upload') ,function(req, res){
//   console.log(req.files);
//   res.status(200).json({res})
//  });

router.post('/', multipartMiddleware, function(req, res) {
  var fs = require('fs');

  fs.readFile(req.files.upload.path, function (err, data) {
      var newPath = __dirname + '/src/uploads/' + req.files.upload.name;
      fs.writeFile(newPath, data, function (err) {
          if (err) console.log({err: err});
          else {
              html = "";
              html += "<script type='text/javascript'>";
              html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
              html += "    var url     = \"/uploads/" + req.files.upload.name + "\";";
              html += "    var message = \"Uploaded file successfully\";";
              html += "";
              html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
              html += "</script>";
              console.log(req.files);
              res.send(html);
          }
      });
  });
});


module.exports = router;