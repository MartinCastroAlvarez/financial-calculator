angular
.module("loancalculator")
.controller("Step1Ctrl",
["$scope", "form", "$state",
function($scope, form, $state) {

    var $controller = {
       form: form.form,
       a: function(a, b, c) {

alert(12834892398498234234);
// $scope.$father.openModal(a, b,c );
alert(123);
       },
       submit: function() {
           form.submit($controller.form);
           $state.transitionTo("loan");
       }
    }

    return $controller;

}]);
