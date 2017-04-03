angular
.module("loancalculator")
.controller("Step3Ctrl",
["$scope", "form", "$state",
function($scope, form, $state) {

    var $controller = {
       form: form.form,
       submit: function() {
           form.submit($controller.form);
           $state.transitionTo("step3");
       }
    }

    return $controller;

}]);
