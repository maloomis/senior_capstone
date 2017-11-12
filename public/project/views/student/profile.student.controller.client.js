(function() {
    angular
        .module("FreshmanApp")
        .controller("ProfileStudentController", ProfileStudentController);

        function ProfileStudentController($location, StudentService, $routeParams, $scope) {
            var vm = this;
            vm.studentId = $routeParams["sid"];
            vm.saveInformation = saveInformation;
            vm.logout = logout;
            vm.noWrapSlides = false;
            vm.active = 0;

            function init() {
                console.log(vm.studentId)
                StudentService.findStudentById(vm.studentId)
                .success(function(student) {
                    if (student != '0') {
                        console.log(student)
                        vm.student = student;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve student";
                });               
            }
            
            init();
        
            function saveInformation(student){
                console.log(student)
                var promise = StudentService.updateStudent(student._id, student);
                promise.success(function(status) {
                        if (status === '0') {
                            vm.error = "Could not update student.";
                        } else {
                            $location.url("/studentProfile/" + vm.student._id);
                        }
                    });
            }

            function logout() {
                $location.url("/studentLogin");
            }
        };
})();