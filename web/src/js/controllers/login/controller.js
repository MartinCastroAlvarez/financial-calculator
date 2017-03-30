angular
.module("loancalculator")
.controller("LoginCtrl",
["$scope", "login", "$state", "toastr",
function($scope, login, $state, toastr) {

    var $controller = {
       username: "",
       password: "",
       doLogin: function() {
           login
           .login($controller.username, $controller.password)
           .then(function(response) {
               toastr.success("Successfully logged in!");
               $state.transitionTo("home");
           }, function(error) {
               toastr.error("Authentication failed!");
           });
       },
       onLoad: function() {},
    }

    $controller.onLoad();

    return $controller;

}]);
