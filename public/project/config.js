(function () {
    angular
        .module("FreshmanApp")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
        .when("/studentLogin", {
            templateUrl: "project/views/student/login.student.view.client.html",
            controller: "LoginStudentController",
            controllerAs: "model"
        })
        .when("/home/:sid", {
            templateUrl: "project/views/student/home.student.view.client.html",
            controller: "HomeStudentController",
            controllerAs: "model"
        })
        .when("/studentProfile/:sid", {
            templateUrl: "project/views/student/profile.student.view.client.html",
            controller: "ProfileStudentController",
            controllerAs: "model",
        })
        .when("/viewStudentProfile/:sid/:vid", {
            templateUrl: "project/views/student/profile.view.client.html",
            controller: "ViewStudentProfileController",
            controllerAs: "model",
        }) 
        .when("/messageStudentProfile/:sid", {
            templateUrl: "project/views/student/messages.student.view.client.html",
            controller: "MessageStudentProfileController",
            controllerAs: "model",
        })  
        /*
        .otherwise({
            redirectTo: "/studentLogin"
        });
        */
    }
})();