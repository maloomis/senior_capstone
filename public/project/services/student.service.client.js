(function () {
    angular
        .module("FreshmanApp")
        .factory("StudentService", StudentService);
    
    function StudentService($http) {        
        var api = {
            "studentLogin": studentLogin,
            "studentLogout": studentLogout,
            "findStudentById" : findStudentById,
            "updateStudent" : updateStudent,
            "messageClient": messageClient,
            "deleteMessage": deleteMessage
        };

        return api;

        function studentLogin(student) {
            var url = "/api/studentLogin/" + student.username;
            return $http.post(url);
        }

        function studentLogout() {
            return $http.post('/api/studentLogout');
        }

        function login(student) {
            return $http.post("/api/studentLogin", student);
        }

        function findStudentById(studentId) {
            var url = '/api/student/' + studentId;
            return $http.get(url);
        };

        function updateStudent(studentId, student) {
            var url = "/api/student/" + student._id;
            return $http.put(url, student);
        };

        function messageClient(message, clientId, trainerId) {
            var url = "/api/client/" + clientId + "/trainer/" + trainerId + "/message";
            return $http.put(url, message);
        }

        function deleteMessage(messageId, clientId) {
            var url = "/api/client/" + clientId + "/message/" + messageId;
            return $http.delete(url);
        }
    }
})();