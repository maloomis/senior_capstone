module.exports = function(app, model) {
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());
   
    app.get('/api/message/:sid', findMessageById);
    app.post('/api/to/:tid/from/:fid', sendMessage);

    function findMessageById(req, res) {
        var studentId = req.params.sid;
        model
            .messageModel
            .findMessageById(studentId)
            .then(
                function(messages) {
                    if (messages) {
                        res.send(messages);
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    };

    function sendMessage(req, res) {
        var message = req.body;
        console.log(message)
        var to = req.params.tid;
        var from = req.params.fid;

        model
            .messageModel
            .sendMessage(message, to, from)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }
}