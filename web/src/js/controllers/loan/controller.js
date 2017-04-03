angular
.module("loancalculator")
.controller("LoanCtrl",
["$scope", "form", "$state",
function($scope, form, $state) {

    var $controller = {
       form: form.form,
       loan: form.loan,
       submit: function() {
           // form.submit($controller.form);
           $state.transitionTo("step2");
       }
    }

    return $controller;

}]);
