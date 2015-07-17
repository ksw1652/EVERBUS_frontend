/**
 * Created by kimsungwoo on 15. 7. 17..
 * this factory for get Message to server
 */

angular.module('globus.service')
    .factory('$msg_onServer',[
        '$http',
        '$q',
        '$window',
        'everbus_config',
        function($http,$q,$window,everbus_config){
            var message_data = {};
            message_data.getMessage = function(){
                var defer = $q.defer();
                $http({
                    url: everbus_config.backend + '/servermsg',
                    method : 'POST'
                }).success(function(data,status,headers, config){
                    defer.resolve(data);
                }).error(function(data, status, headers, config){
                    $window.alert(data);
                });
                return defer.promise;
            };
            return message_data;
        }
    ]);

