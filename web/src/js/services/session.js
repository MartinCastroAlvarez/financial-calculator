angular
.module("loancalculator")
.factory('session',
["$q", function($q) {

    var $service = {
        token: "",
        isAuthenticated: function() {
            return $service.token != "";
        },
    }

    return $service; 

}])
