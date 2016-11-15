// var mongoose = require('mongoose');
var multer = require('multer');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

module.exports = function(app, mongoose) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // upload things
  // var upload = multer({ dest: './gedcom/uploads/' });
  // var type = upload.single('sampleFile'); // sampleFile must match name of input on frontend

  // I couldn't figure out how to change the filename that is sent over, and saw that the action from the client side was sending the name "filename", so using that name here.
  app.post("/uploads", multer({dest: "./gedcom/uploads/"}).single("gedcom"), function(req, res) {
    console.log("inside multer");
    res.send(req.files);
  });

  // mongo connection
  // mongoose.connect('mongodb://localhost');
  // var db = mongoose.connection;
  // var people = require('./people.model')(mongoose); // change this to your people model

  // get the info from the upload button
  // app.post('/uploads', type, function(req, res, next) {
  //   console.log("in the multer uploads");
  //   // parse and import people
  //   exec('python ./gedcom/gedcomparse.py ./gedcom/uploads/' + req.file.filename + ' ./gedcom/jsonfiles/' + req.file.filename + 'indi.json',  // run the python program on the info
  //     function(err) {
  //     if(err) {
  //       console.log('python parse failed', err);
  //     }
  //     else {
  //       console.log('gedcom saved and parsed to json with python');
  //       exec('mongoimport --db test --collection gedcom_indi --type json --file ./gedcom/jsonfiles/' + req.file.filename + 'indi.json --jsonArray', function(err) { // imports the file that was just uploaded into mongoDB
  //         if(err) {
  //           console.log('mongo import failed', err);
  //         }
  //         else {
  //           console.log('json file imported to mongo');
  //         }
  //       });
  //     }
  //   });
  //   // parse and import parents
  //   exec('python ./gedcom/gedcomparent.py ./gedcom/uploads/' + req.file.filename + ' ./gedcom/jsonfiles/' + req.file.filename + 'parent.json',  // run the python program on the info
  //     function(err) {
  //     if(err) {
  //       console.log('python parse failed', err);
  //     }
  //     else {
  //       console.log('gedcom saved and parsed to json with python');
  //       exec('mongoimport --db test --collection gedcom_parent --type json --file ./gedcom/jsonfiles/' + req.file.filename + 'parent.json --jsonArray', function(err) { // imports the file that was just uploaded into mongoDB
  //         if(err) {
  //           console.log('mongo import failed', err);
  //         }
  //         else {
  //           console.log('json file imported to mongo');
  //         }
  //       });
  //     }
  //   });

  //   // parse and import pair bonds
  //   exec('python ./gedcom/gedcompairbonds.py ./gedcom/uploads/' + req.file.filename + ' ./gedcom/jsonfiles/' + req.file.filename + 'pairbond.json',  // run the python program on the info
  //     function(err) {
  //     if(err) {
  //       console.log('python parse failed', err);
  //     }
  //     else {
  //       console.log('gedcom saved and parsed to json with python');
  //       exec('mongoimport --db test --collection gedcom_pairbond --type json --file ./gedcom/jsonfiles/' + req.file.filename + 'pairbond.json --jsonArray', function(err) { // imports the file that was just uploaded into mongoDB
  //         if(err) {
  //           console.log('mongo import failed', err);
  //         }
  //         else {
  //           console.log('json file imported to mongo');
  //         }
  //       });
  //     }
  //   });

  //   res.redirect('/uploaddirect');
  // });

  // app.use(function(req, res, next) {
  //     console.log(req.url);
  //     next();
  // });

  // app.use(express.static(__dirname));

  app.get("/uploaddirect", function(req, res) {
      res.sendFile(__dirname + "/upload.html");
  });
};