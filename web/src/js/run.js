angular
.module('loancalculator')
.run(["$ionicPlatform", "$state", "session", "$rootScope",
function($ionicPlatform, $state, session, $rootScope) {

    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      if (toState.authRequired && !session.isAuthenticated()){
          $state.transitionTo("login");
          event.preventDefault(); 
      }
    });

}])
