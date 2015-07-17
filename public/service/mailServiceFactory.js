/**
 * Created by kimsungwoo on 15. 2. 3..
 */
angular.module('globus.service')
    .factory('$mailServiceFactory', ['$http', 'everbus_config', function ($http, everbus_config) {
        return {
            sendmail : function(data){
                $http({
                    url: everbus_config.backend + '/mailfaq',
                    method: 'POST',
                    data: { 'data': data }
                }).success(function (data, status, headers, config) {
                    console.log(data);
                }).error(function (error, status, headers, config) {
                    console.log(error);
                });

            }
        }
    }]);
