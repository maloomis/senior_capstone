module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var MessageSchema = new Schema({
        to: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentModel' 
        }],
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentModel' 
        },
        message: String,
        groupMessage: Boolean,
        dateCreated: { type: Date, default: Date.now}
        }, {collection: "message"});
    return MessageSchema;
}

