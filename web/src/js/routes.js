angular
.module('loancalculator')
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('step1', {
        url: '/step1/',
        authRequired: false,
        templateUrl: 'step1/template',
        controller: 'Step1Ctrl',
        controllerAs: 'vm',
    })
    .state('loan', {
        url: '/loan/',
        authRequired: false,
        templateUrl: 'loan/template',
        controller: 'LoanCtrl',
        controllerAs: 'vm',
    })
    .state('step2', {
        url: '/step2/',
        authRequired: false,
        templateUrl: 'step2/template',
        controller: 'Step2Ctrl',
        controllerAs: 'vm',
    })
    .state('step3', {
        url: '/step3/',
        authRequired: false,
        templateUrl: 'step3/template',
        controller: 'Step3Ctrl',
        controllerAs: 'vm',
    })
    .state('login', {
        url: '/login/',
        authRequired: false,
        templateUrl: 'login/template',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
    })

    $urlRouterProvider.otherwise('/step1/');

})
