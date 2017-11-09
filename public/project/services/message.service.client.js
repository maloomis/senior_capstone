(function () {
    angular
        .module("FreshmanApp")
        .factory("MessageService", MessageService);
    
    function MessageService($http) {        
        var api = {
            "findMessageById" : findMessageById,
            "sendMessage" : sendMessage
        };

        return api;

        function findMessageById(studentId) {
            var url = '/api/message/' + studentId;
            return $http.get(url);
        };

        function sendMessage(message, to, from) {
            var message = {m: message};
            var url = '/api/to/' + to + '/from/' + from;
            return $http.post(url, message);
        }
    }
})();