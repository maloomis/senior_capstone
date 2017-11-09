module.exports = function() {
    var mongoose = require("mongoose");
    var ObjectId = require('mongodb').ObjectID;
    var MessageSchema = require("./message.schema.server.js")();
    var MessageModel = mongoose.model('MessageModel', MessageSchema, 'MessageModel');

    var api = {
        findMessageById : findMessageById,
        sendMessage : sendMessage
    };
    return api;

    function findMessageById(studentId) {
        return MessageModel.find({$or: [{to: studentId}, {from: studentId}]}).populate('from').populate('to');
    }

    function sendMessage(message, to, from) {
        return MessageModel.create(
            {
                message: message.m,
                to: to,
                from: from
            }
        );
    }
}
