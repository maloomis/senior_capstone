module.exports = function() {
    var mongoose = require("mongoose");
    var ObjectId = require('mongodb').ObjectID;
    var ConversationSchema = require("./conversation.schema.server.js")();
    var ConversationModel = mongoose.model('ConversationModel', ConversationSchema, 'ConversationModel');

    var api = {
        findConversationById : findConversationById,
        findConversations : findConversations,
        startConversation : startConversation
    };
    return api;

    function findConversationById(studentId) {
        return ConversationModel.find({$or: [{to: studentId}, {from: studentId}]}).populate('from').populate('to');
    }

    function findConversations() {
        return ConversationModel.find().populate('participants');
    }

    function startConversation(participants) {
        var conversation = new ConversationModel({participants: participants})
        return conversation.save();
    }
}