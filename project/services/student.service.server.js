module.exports = function(app, model) {
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());

    var mime = require('mime');
    var path = require('path')
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/opt/bitnami/apps/senior_capstone/public/project/upload');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    var upload = multer({ storage: storage });
   
    app.post('/api/studentLogin/:username', studentLogin);
    app.post('/api/studentLogout', studentLogout);;
    app.get('/api/student/:sid', findStudentById);
    app.put('/api/student/:sid', updateStudent);
    app.put('/api/student/:sid/studentSend/:sid/message', messageStudent);
    app.post ("/api/uploadImage", upload.array('photos', 10), uploadImage);

    function studentLogout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function studentLogin(req, res) {
        var username = req.params.username;
        model
            .studentModel
            .findStudentByUsername(username)
            .then(
                function(student) {
                    if (student) {
                        res.send(student);
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err)
                }
            )
    }

    function findStudentById(req, res) {
        var studentId = req.params.sid;
        model
            .studentModel
            .findStudentById(studentId)
            .then(
                function(student) {
                    if (student) {
                        res.send(student);
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    };

    function updateStudent(req, res) {
        var student = req.body;
        var studentId = req.params.sid;
        model
            .studentModel
            .updateStudent(student, studentId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function messageStudent(req, res) {
        var studentId = req.params.sid;
        var studentMessageId = req.params.smid;
        var message = req.body;

        model
            .studentModel
            .messageStudent(message, studentId, studentMessageId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function uploadImage(req, res) {
        var studentId        = req.body.studentId;
        var myFiles        = req.files;

        console.log(myFiles)
        var fileNames = [];

        for (var i = 0; i < myFiles.length; i++) {
            var originalname  = myFiles[i].originalname; // file name on user's computer
            var filename      = myFiles[i].filename;
            var path          = myFiles[i].path;         // full path of uploaded file
            var destination   = myFiles[i].destination;  // folder where file is saved to
            var size          = myFiles[i].size;
            var mimetype      = myFile[i].mimetype;

            var string = "upload/" + filename;

            fileNames.push(string)
        }

        console.log(fileNames)

        model
            .studentModel
            .uploadImage(studentId, fileNames)
            .then(
                function(status) {
                    res.redirect('../index.html#/studentProfile/'+ studentId);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
}