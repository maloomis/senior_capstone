module.exports = function() {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://test:test@ds251845.mlab.com:51845/capstone_project';
    mongoose.connect(connectionString);   
    console.log("connected to mongoose - project");

    var studentModel = require("./student/student.model.server")();
    var messageModel = require("./message/message.model.server")();

    var model = {
        studentModel: studentModel,
        messageModel : messageModel
    }
    return model;
};