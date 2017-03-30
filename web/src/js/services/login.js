angular
.module("loancalculator")
.factory('login',
["$q", "appserver", "session",
function($q, appserver, session) {

    var $service = {
        login: function(username, password) {
            return $q(function (resolve, reject) {
                appserver
                .post({
                    url: "login/",
                    data: {
                        username: username,
                        password: password,
                    }
                })
                .then(function(response) {
                    resolve(repsonse);
                }, function(error) {
                    reject(error);
                });
            });
        },
    }

    return $service; 

}])
