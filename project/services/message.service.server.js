module.exports = function(app, model) {
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());
   
    app.get('/api/message/:sid', findMessages);
    app.post('/api/sendMessage', sendMessage);

    function findMessages(req, res) {
        var conversationId = req.params.sid;
        model
            .messageModel
            .findMessages(conversationId)
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

        model
            .messageModel
            .sendMessage(message)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }
}