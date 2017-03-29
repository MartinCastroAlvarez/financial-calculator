angular.module("loancalculator").config(function(){});
angular.module("loancalculator").config(["$stateProvider","$urlRouterProvider",function(e,o){e.state("home",{url:"/",templateUrl:"home/template",controller:"HomeCtrl"}),o.otherwise("/")}]);
angular.module("loancalculator").run(["$ionicPlatform",function(o){o.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]);

angular.module("loancalculator").controller("HomeCtrl",["$scope",function(l){}]);

