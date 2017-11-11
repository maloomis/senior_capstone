(function() {
    angular
        .module("FreshmanApp")
        .controller("MessageStudentProfileController", MessageStudentProfileController);

        function MessageStudentProfileController(ConversationService, $location, MessageService, StudentService, $routeParams, $scope, $uibModal) {
            var vm = this;
            vm.studentId = $routeParams["sid"];
            vm.chatStudent = chatStudent;
            vm.sendMessage = sendMessage;
            vm.open = open;

            function init() {
                vm.messageSorted = [];

                ConversationService.findConversations()
                .success(function(conversations){
                    if (conversations != '0') {
                        vm.conversations = conversations;
                        for (var i = 0; i < conversations.length; i++) {
                            var element = conversations[i].participants.filter(participant => participant._id === vm.studentId); 
                            const index = conversations[i].participants.indexOf(element[0]);
                            vm.conversations[i].participants.splice(index, 1);

                            //load chat
                            chatStudent(vm.conversations[0]);
                        }
                    } else {
                        console.log("could not get conversations");
                    }
                })
            }
            
           init();

           function chatStudent(conversation) {
               vm.conversation = conversation;

               MessageService.findMessages(conversation._id)
               .success(function(messages) {
                   if (messages != '0') {
                       vm.messages = messages;
                   } else {
                       console.log("could not retrieve messages");
                   }
               })
           }

           function sendMessage(content) {
               MessageService.sendMessage(content, vm.studentId, vm.conversation._id)
               .success(function(status) {
                    if (status === '0') {
                        vm.error = "Could not send message.";
                    } else {
                        vm.content= "";
                        chatStudent(vm.conversation);
                    }
                })
           }

           function open() {
                $uibModal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceController',
                    controllerAs: 'model'
                })
            }
        };
})();