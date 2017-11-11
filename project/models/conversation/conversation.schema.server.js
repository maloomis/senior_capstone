module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var ConversationSchema = new Schema({
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentModel' 
        }],
        dateCreated: { type: Date, default: Date.now}
        }, {collection: "conversation"});
    return ConversationSchema;
}
