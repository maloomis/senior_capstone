(function() {
    angular
        .module("FreshmanApp")
        .controller("MessageStudentProfileController", MessageStudentProfileController);

        function MessageStudentProfileController($location, MessageService, StudentService, $routeParams, $scope, $uibModal) {
            var vm = this;
            vm.studentId = $routeParams["sid"];
            vm.chatStudent = chatStudent;
            vm.sendMessage = sendMessage;
            vm.open = open;

            function init() {
                vm.messageSorted = [];

                MessageService.findMessageById(vm.studentId)
                .success(function(messages) {
                    if (messages != '0') {
                        vm.messages = messages;
                        vm.chatStudentName = messages[0].from.name;

                        for (var i = 0; i < messages.length; i++) {
                            //my sent messages
                            if(messages[i].from._id == vm.studentId) {
                                if((vm.messageSorted.filter(message => message.name === messages[i].to.name)) == 0) {
                                    var newName = {name: messages[i].to.name, _id: messages[i].to._id};
                                    vm.messageSorted.push(newName);
                                } 
                                continue;
                            }
                            
                            if((vm.messageSorted.filter(message => message.name === messages[i].from.name)) == 0) {
                                var newName = {name: messages[i].from.name, count: 1, _id: messages[i].from._id};
                                vm.messageSorted.push(newName);
                            } else {
                                var duplicate = vm.messageSorted.filter(message => message.name === messages[i].from.name);
                                duplicate[0].count++;
                            } 
                        }

                        chatStudent(messages[0].from);
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve messages";
                });
            }
            
           init();

           function chatStudent(student) {
               vm.chatStudentName = student.name;
               vm.chatStudentId = student.id;

                MessageService.findMessageById(student._id)
                .success(function(messages){
                    if (messages != '0') {
                        vm.chatMessages = messages;
                    }
                })
                .error (function() {
                vm.error = "Could not retrieve messages";
                });

                var read = vm.messageSorted.filter(message => message.name == student.name);
                if (read[0]) {
                    read[0].count = "";
                }
           }

           function sendMessage(message) {
               MessageService.sendMessage(message, vm.chatStudentId, vm.studentId)
               .success(function(status) {
                    if (status === '0') {
                        vm.error = "Could not send message.";
                    } else {
                        MessageService.findMessageById(vm.chatStudentId)
                        .success(function(messages){
                            if (messages != '0') {
                                vm.chatMessages = messages;
                            }
                        })
                        .error (function() {
                            vm.error = "Could not retrieve messages";
                        });

                        vm.messageToSend = "";
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