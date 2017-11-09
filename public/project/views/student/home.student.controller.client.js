(function() {
    angular
        .module("FreshmanApp")
        .controller("HomeStudentController", HomeStudentController);

        function HomeStudentController($location, StudentService, $routeParams, $scope) {
            var vm = this;
            vm.studentId = $routeParams["sid"];
         //   vm.logout = logout;

            function init() {
                StudentService.findStudentById(vm.studentId)
                .success(function(student) {
                    if (student != '0') {
                        vm.student = student;

                        //retrieve roommate
                        vm.roommate = [];

                        for (i = 0; i < student.roommate.length; i++) {
                            StudentService.findStudentById(student.roommate[i]._id)
                            .success(function(roommate){
                                if(roommate != '0') {
                                    vm.roommate.push(roommate);
                                }
                            });
                        }

                        //retrieve ra
                        vm.ra = [];
                        
                        for (i = 0; i < student.ra.length; i++) {
                            StudentService.findStudentById(student.ra[i]._id)
                            .success(function(ra){
                                if(ra != '0') {
                                    vm.ra.push(ra);
                                }
                            });
                        }

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
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve student";
                });               
            }
            
            init();
        }
})();