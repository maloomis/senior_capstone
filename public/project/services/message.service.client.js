(function () {
    angular
        .module("FreshmanApp")
        .factory("MessageService", MessageService);
    
    function MessageService($http) {        
        var api = {
            "findMessages" : findMessages,
            "sendMessage" : sendMessage
        };

        return api;

        function findMessages(conversationId) {
            var url = '/api/message/' + conversationId;
            return $http.get(url);
        };

        function sendMessage(message, sender, conversation) {
            var message = {m: message, sender: sender, conversation: conversation};
            console.log(message)
            var url = '/api/sendMessage/';
            return $http.post(url, message);
        }
    }
})();