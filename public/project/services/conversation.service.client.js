(function () {
    angular
        .module("FreshmanApp")
        .factory("ConversationService", ConversationService);
    
    function ConversationService($http) {        
        var api = {
            "startConversation" : startConversation,
            "findConversations" : findConversations
        };

        return api;

        function startConversation(participants) {
            var url = '/api/startConversation/';
            return $http.post(url, participants);
        };

        function findConversations() {
            var url = '/api/findConversations';
            return $http.get(url);
        }
    }
})();