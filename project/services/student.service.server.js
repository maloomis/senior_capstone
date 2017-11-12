module.exports = function(app, model) {
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());

    var mime = require('mime');
    var path = require('path')
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './apps/senior_capstone/project/public/project/upload');
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
    app.post ("/api/uploadImage", upload.single('myFile'), uploadImage);

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
        var myFile        = req.file;

        console.log(myFile.path)

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        model
            .studentModel
            .uploadImage(studentId, filename)
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