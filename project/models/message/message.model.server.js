module.exports = function() {
    var mongoose = require("mongoose");
    var ObjectId = require('mongodb').ObjectID;
    var MessageSchema = require("./message.schema.server.js")();
    var MessageModel = mongoose.model('MessageModel', MessageSchema, 'MessageModel');

    var api = {
        findMessages : findMessages,
        sendMessage : sendMessage
    };
    return api;

    function findMessages(conversationId) {
        return MessageModel.find({conversation: conversationId}).populate('sender');
    }

    function sendMessage(message) {
        return MessageModel.create(
            {
                content: message.m,
                sender: message.sender,
                conversation: message.conversation
            }
        );
    }
}
