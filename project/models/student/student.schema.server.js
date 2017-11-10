module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var StudentSchema = new Schema({
        username: String,
        password: String,
        name: String,
        major: String,
        graduationYear: String,
        dorm: String, 
        room: String,
        hometown: String, 
        hobbies: String,
        img: String,
        instagram: String,
        snapchat: String,
        roommate: [{
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'StudentModel'
            }
        }],
        ra: [{
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'StudentModel'
            }
        }],
        building: [{
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'StudentModel'
            }
        }],
        dateCreated: { type: Date, default: Date.now}
        }, {collection: "student"});
    return StudentSchema;
}