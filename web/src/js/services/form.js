angular
.module("loancalculator")
.factory('form',
function() {

    var $service = {
        form: {
            property: 50000,
            propertyType: 'residential',
            properties: 1,
            leasehold: 0,
            mortage: 0,
            payment: 'serviced',
            outstanding: 0,
            loantovalue: 0,
            refurbishment: "none",
            chargeType: "1st",
            securityType: "residential",
            credit: "good",
            capital: 1000,
            months: 3,
        },
        loan: {
            total: {
                payable: 0,
                monthly: 0,
            },
            rates: {
                nominal: 0,
                overall: 0,
            },
            costs: {
                financial: 0,
                fees: 0,
                total: 0,
            },
            fees: {
                arrangement: 0,
                exit: 0,
                legal: 0,
                valuation: 0,
            },
        },
        submit: function(data) {

           $service.form.capital = parseFloat($service.form.capital);
           $service.form.months = parseFloat($service.form.months);
           $service.form.property = parseFloat($service.form.property);

           $service.loan.rates.nominal = 0.75;

           $service.loan.costs.financial = $service.form.capital * (0 + $service.loan.rates.nominal * $service.form.months / 12);

           $service.loan.fees.arrangement = ($service.form.capital + $service.loan.costs.financial) * 0.02
           $service.loan.costs.fees = $service.loan.fees.arrangement + $service.loan.fees.exit + $service.loan.fees.legal + $service.loan.fees.valuation;

           $service.loan.costs.total = $service.loan.costs.financial + $service.loan.costs.fees;

           $service.loan.total.payable = $service.form.capital + $service.loan.costs.total;

           $service.loan.total.monthly = $service.loan.total.payable / $service.form.months;

           $service.loan.rates.overall = $service.loan.total.payable / $service.form.capital - 1;
           $service.loan.rates.overall = $service.loan.rates.overall.toFixed(2);

        }
    }

    return $service; 

})
