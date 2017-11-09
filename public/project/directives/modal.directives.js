angular
    .module('FreshmanApp', [])
    .directive('opendialog',
        function() {
        var openDialog = {
            link :   function(scope, element, attrs) {
                function openDialog() {
                var element = angular.element('#myModal');
                var ctrl = element.controller();
                ctrl.setModel(scope.blub);
                element.modal('show');
                }
                element.bind('click', openDialog);
            }
        }
        return openDialog;
})();   