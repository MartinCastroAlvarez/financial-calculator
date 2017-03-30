angular
.module('loancalculator')
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        authRequired: false,
        templateUrl: 'home/template',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
    })
    .state('login', {
        url: '/login/',
        authRequired: false,
        templateUrl: 'login/template',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
    })

    $urlRouterProvider.otherwise('/');

})
