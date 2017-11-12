module.exports = function() {
    var mongoose = require("mongoose");
    var StudentSchema = require("./student.schema.server.js")();
    var StudentModel = mongoose.model('StudentModel', StudentSchema, 'StudentModel');

    var api = {
        findStudentByUsername: findStudentByUsername,
        findStudentById: findStudentById,
        updateStudent: updateStudent,
        messageStudent: messageStudent,
        uploadImage: uploadImage
    };
    return api;

    function findStudentByUsername(username) {
        return StudentModel.findOne({
            username: username
        });
    }

    function findStudentById(studentId) {
        return StudentModel.findById(studentId).populate('building');
    }

    function updateStudent(student, studentId) {
        return StudentModel.update(
            {
                _id: studentId
            }, 
            {
                hobbies: student.hobbies,
                instagram: student.instagram,
                snapchat: student.snapchat
            }
        );
    }

    function messageStudent(message, studentMessageId, studentId) {
        var message = {
            message: message.text,
            student: studentMessageId
        }
        return StudentModel.update (
            {
                _id: studentId
            },
            {
                "$push" : {"messages" : message}
            }
        )
    }

    function uploadImage(studentId, fileNames) {
        console.log(fileNames)

        return StudentModel.update (
            {
                _id: studentId
            }, 
            {
                img: fileNames
            }
        );
    }


}
