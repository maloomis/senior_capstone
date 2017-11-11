module.exports = function(app, model) {
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());
   
    app.post('/api/startConversation', startConversation);
    app.get('/api/findConversations', findConversations);

    function startConversation(req, res) {
        var participants = req.body;
        model
            .conversationModel
            .startConversation(participants)
            .then(function (conversation) {
                    res.send(conversation);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function findConversations(req, res) {
        model
            .conversationModel
            .findConversations()
            .then(function (conversations) {
                res.send(conversations);
            },
            function(err) {
                res.sendStatus(400).send(err);
            }
        )
    }
   
}