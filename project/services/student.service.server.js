module.exports = function(app, model) {
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());
   
    app.post('/api/studentLogin/:username', studentLogin);
    app.post('/api/studentLogout', studentLogout);;
    app.get('/api/student/:sid', findStudentById);
    app.put('/api/student/:sid', updateStudent);
    app.put('/api/student/:sid/studentSend/:sid/message', messageStudent);

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
}