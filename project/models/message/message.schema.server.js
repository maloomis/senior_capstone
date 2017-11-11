module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var MessageSchema = new Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentModel' 
        },
        content: String,
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ConversationModel'
        },
        dateCreated: { type: Date, default: Date.now}
        }, {collection: "message"});
    return MessageSchema;
}

