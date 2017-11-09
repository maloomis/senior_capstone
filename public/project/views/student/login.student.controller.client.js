(function() {
    angular
        .module("FreshmanApp")
        .controller("LoginStudentController", LoginStudentController);

        function LoginStudentController($location, StudentService) {
            var vm = this;
            vm.login = login;

            function login(student) {
                var promise = StudentService.studentLogin(student);
                promise.success(function(student) {
                        if (student === '0') {
                            vm.error = "No such student";
                        } else {
                            $location.url("/home/" + student._id);
                        }
                    });
            }
        }
})();