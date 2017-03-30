angular
.module("loancalculator")
.provider('appserver',
function() {

    var $provider = {
      HOST: ""
    };

    $provider.$get = ["$q", "$http", "$log",  function($q, $http, $log) {

      function request(method, reqargs) {

        var path = reqargs.url;
        var data = reqargs.data || {};
        var params = reqargs.args || {};
        var headers = {
          'Content-Type': "application/json",
          // 'Access-Token': $service.token,
        } 

        var url = $provider.HOST + path;

        return $q(function (resolve, reject) {

            /*
            if (path != 'login/' && !$service.token) {
                $log.log("Not authenticated.");
                resolve({});
            }
            **/

            var config = {
                method: method,
                url: url,
                data: data,
                params: params,
                timeout: 3000,
                headers: headers,
            }

            $log.log(method + " " + config.url);
            $http(config)
            .then(function (response) {
                $log.log(response);
                resolve(response); 
             }, function(error) {
                $log.log(error);
                reject(error); 
             });

        });
    }

    var $service = {
        token: null,
        get: function(r) {
            return request("GET", r);
        },
        post: function(r) {
            return request("POST", r);
        },
        put: function(r) {
            return request("PUT", r);
        },
        delete: function(r) {
            return request("DELETE", r);
        }
    } 

    return $service; 

  }];

  return $provider; 

});
