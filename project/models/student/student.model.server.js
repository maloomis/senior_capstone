module.exports = function() {
    var mongoose = require("mongoose");
    var StudentSchema = require("./student.schema.server.js")();
    var StudentModel = mongoose.model('StudentModel', StudentSchema, 'StudentModel');

    var api = {
        createStudent: createStudent,
        createStudent: createStudent,
        findStudentByUsername: findStudentByUsername,
        findStudentById: findStudentById,
        updateStudent: updateStudent,
        messageStudent: messageStudent
    };
    return api;

    function createStudent(username, password, name, major, graduationYear, dorm, hobbies, room, hometown) {
        StudentModel.create({
            username: username,
            password: password,
            name: name,
            major: major,
            graduationYear,
            dorm: dorm,
            hobbies: hobbies,
            room: room,
            hometown: hometown
        });
    }

    function createStudent(username, password, name, major, graduationYear, dorm, hobbies, room, hometown, roommate) {
        StudentModel.create({
            username: username,
            password: password,
            name: name,
            major: major,
            graduationYear,
            dorm: dorm,
            hobbies: hobbies,
            room: room,
            hometown: hometown,
            roommate: roommate
        });
    }

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
}
