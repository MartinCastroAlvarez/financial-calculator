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
           rates: {
               nominal: 0,
               overall: 0,
           },
           total: 0,
           perMonth: 0,
           costs: {
               total: 0,
               financial: 0,
               fees: 0,
           },
           fees: {
               arrangement: 0,
               exit: 0,
               legal: 0,
               valuation: 0,
           },
       },
       goToStep2: function() {

           $controller.form.capital = parseFloat($controller.form.capital);
           $controller.form.duration = parseFloat($controller.form.duration);
           $controller.form.property = parseFloat($controller.form.property);

           $controller.loan.rates.nominal = 0.75;

           $controller.loan.costs.financial = $controller.form.capital * (0 + $controller.loan.rates.nominal * $controller.form.duration / 12);

           $controller.loan.fees.arrangement = ($controller.form.capital + $controller.loan.costs.financial) * 0.02
           $controller.loan.costs.fees = $controller.loan.fees.arrangement + $controller.loan.fees.exit + $controller.loan.fees.legal + $controller.loan.fees.valuation;

           $controller.loan.costs.total = $controller.loan.costs.financial + $controller.loan.costs.fees;

           $controller.loan.total = $controller.form.capital + $controller.loan.costs.total;

           $controller.loan.perMonth = $controller.loan.total / $controller.form.duration;

           $controller.loan.rates.overall = $controller.loan.total / $controller.form.capital - 1;
           $controller.loan.rates.overall = $controller.loan.rates.overall.toFixed(2);

           $controller.step = 2;
       },
       onLoad: function() {}
    }

    $controller.onLoad();

    return $controller;

}]);
