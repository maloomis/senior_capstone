(function() {
    angular
        .module("FreshmanApp")
        .controller("ViewStudentProfileController", ViewStudentProfileController);

        function ViewStudentProfileController($uibModal, $location, StudentService, $routeParams, $scope, $http, $log, $document) {
            var vm = this;
            vm.studentId = $routeParams["sid"];
            vm.viewStudentId = $routeParams["vid"];
            vm.blub = "Test";
            vm.open = open;

            function init() {
                StudentService.findStudentById(vm.viewStudentId)
                .success(function(student) {
                    if (student != '0') {
                        vm.student = student;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve student";
                });               
            }
            
            init();

            function open() {
                $uibModal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceController',
                    controllerAs: 'model'
                })
            }
        };
})();