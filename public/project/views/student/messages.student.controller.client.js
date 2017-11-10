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
                        console.log(messages)
                        vm.messages = messages;
                        vm.chatStudentName = messages[0].from.name;

                        for (var i = 0; i < messages.length; i++) {
                            //check if group message
                            if (messages[i].groupMessage === "true") {
                                var groupNames = [];
                                var groupIds = [];

                                //store the to names
                                for (var j = 0; j < messages[i].to.length; j++) {
                                    var newName = {name: messages[i].to[j].name};
                                    var newId = {_id: messages[i].to[j]._id};
                                    groupNames.push(newName);
                                    groupIds.push(newId);
                                }

                                //push group names to message list
                                var newList = {name: groupNames, _id: groupIds, groupMessage: true};
                                vm.messageSorted.push(newList);
                                continue;
                            }

                            //filter message I sent
                            if(messages[i].from._id == vm.studentId) {
                                if((vm.messageSorted.filter(message => message.name === messages[i].to[0].name)) == 0) {
                                    var newName = {name: messages[i].to[0].name, _id: messages[i].to[0]._id};
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
                        
                       // chatStudent(messages[0].from);
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve messages";
                });

            }
            
           init();

           function chatStudent(student) {
               console.log(student)
               vm.chatStudentName = "";
               vm.chatStudentId = [];

               for (var i = 0; i < student.name.length; i++) {
                vm.chatStudentName = vm.chatStudentName + " " + student.name[i].name;
                vm.chatStudentId.push(student._id[i]._id);
               }

                MessageService.findMessageById(vm.chatStudentId)
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