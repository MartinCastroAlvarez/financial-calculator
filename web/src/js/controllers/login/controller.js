angular
.module("loancalculator")
.controller("LoginCtrl",
["$scope", "login",
function($scope, login) {

    var $controller = {
       username: "",
       password: "",
       doLogin: function() {
           login.login($controller.username, $controller.password);
       },
       onLoad: function() {},
    }

    $controller.onLoad();

    return $controller;

}]);
