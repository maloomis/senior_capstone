(function() {
    angular
        .module("FreshmanApp")
        .controller("ModalInstanceController", ModalInstanceController);

        function ModalInstanceController($uibModalInstance, $routeParams, MessageService, StudentService, ConversationService) {
            var vm = this;
            vm.messageFromProfile = messageFromProfile;
            vm.newMessage = newMessage;
            vm.cancel = cancel;
            vm.setToId = setToId;
            vm.studentId = $routeParams["sid"];
            vm.viewStudentId = $routeParams["vid"];
            vm.sendNames = []; 
            vm.settings = {displayProp: 'name'};

            function init() {
                StudentService.findStudentById(vm.studentId)
                .success(function(student){
                    if (student != '0') {

                        //retrieve students in building
                        vm.building = [];

                        for (i = 0; i < student.building.length; i++) {
                            StudentService.findStudentById(student.building[i]._id)
                            .success(function(buildingStudent){
                                if(buildingStudent != '0') {
                                    vm.building.push(buildingStudent);
                                }
                            });
                        }

                        //retrieve roommate                        
                        for (i = 0; i < student.roommate.length; i++) {
                            StudentService.findStudentById(student.roommate[i]._id)
                            .success(function(roommate){
                                if(roommate != '0') {
                                    vm.building.push(roommate);
                                }
                            });
                        }
                                                
                        //retrieve ra
                        for (i = 0; i < student.ra.length; i++) {
                            StudentService.findStudentById(student.ra[i]._id)
                            .success(function(ra){
                                if(ra != '0') {
                                    vm.building.push(ra);
                                }
                            });
                        }
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve student";
                });
            }

            init();

            function messageFromProfile() {
                participants = [];
                participants.push(vm.studentId);
                participants.push(vm.viewStudentId);
                console.log(participants)
                
                ConversationService.startConversation(participants)
                .success(function(conversation) {
                    if (conversation === '0') {
                        vm.error = "Could not send message.";
                    } else {
                        console.log("started conversation");
                        vm.conversationId = conversation._id;
                        console.log(vm.message)

                        MessageService.sendMessage(vm.message, vm.studentId, vm.conversationId)
                        .success(function(status) {
                            if (status === '0') {
                                vm.error = "Could not send message.";
                            } else {
                                console.log("sent message");
                            }
                        });
                    }
                })
                $uibModalInstance.close();
                window.location.reload();
            }

            function newMessage() {
                particpants = vm.sendNames;
                particpants.push(vm.studentId);
                
                ConversationService.startConversation(particpants)
                .success(function(conversation) {
                    if (conversation === '0') {
                        vm.error = "Could not send message.";
                    } else {
                        console.log("started conversation");
                        vm.conversationId = conversation._id;
                        console.log(vm.conversationId)

                        MessageService.sendMessage(vm.message, vm.studentId, vm.conversationId)
                        .success(function(status) {
                            if (status === '0') {
                                vm.error = "Could not send message.";
                            } else {
                                console.log("sent message");
                            }
                        });
                    }
                })
                $uibModalInstance.close();
                window.location.reload();
            };

            function setToId(id, name) {
                vm.toId = id;
                vm.toName = name
            }
            
            function cancel() {
                $uibModalInstance.dismiss('cancel');
            };
        };
})();