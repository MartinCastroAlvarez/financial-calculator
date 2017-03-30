angular
.module("loancalculator")
.controller("HomeCtrl",
["$scope",
function($scope) {

    var $controller = {
       step: 1,
       form: {
           capital: 1000,
           duration: 3,
           property: 50000,
           chargeType: "1st",
           securityType: "residential",
           credit: "good",
       },
       loan: {
           total: 0,
           arrangementFee: 0,
           cost: 0,
           rate: 0,
           perMonth: 0,
           exitFee: 0,
           legalFee: "To be confirmed",
           valuationFee: "To be confirmed",
       },
       goToStep2: function() {
           $controller.loan.rate = 0.75;
           $controller.loan.total = $controller.form.capital * (1 + $controller.loan.rate * $controller.form.duration / 12);
           $controller.loan.cost = $controller.loan.total - $controller.form.capital;
           $controller.loan.perMonth = $controller.loan.total / $controller.form.duration;
           $controller.loan.arrangementFee = $controller.loan.total * 0.02
           $controller.step = 2;
       },
       onLoad: function() {}
    }

    $controller.onLoad();

    return $controller;

}]);
