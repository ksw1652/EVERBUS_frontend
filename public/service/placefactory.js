/**
 * Created by airnold on 14. 11. 14..
 */
//placefactory.js
angular.module('globus.service')
    .factory('$place_search', ['$window', '$q', '$http','everbus_config', function ($window, $q, $http,everbus_config) {
        var placeobj = {};

        placeobj.place_search = function (data) {
            var defer = $q.defer();

            $http({
                url: everbus_config.backend + '/placeSearch',
                method: 'POST',
                data: { 'data': data }
            }).success(function (data, status, headers, config) {
                placeobj.placesearchResult = data;
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                $window.alert(data);
            });

            return defer.promise;
        };
        return placeobj;
    }])
    .factory('$place_alltime',['$http','$q','$window','everbus_config',function($http,$q,$window,everbus_config) {
        var place_alltime_object = {};

        place_alltime_object.getplacedetaildata = function (items) {
            var deferred = $q.defer();
            var urlCalls = [];

            var first_data = {};
            first_data.sid = items[0].sid;
            first_data.cityennm = items[0].cityennm;
            first_data.citycode = items[0].citycd;

            var firststopPromise = $http({
                url: everbus_config.backend + '/stationDetail',
                method: 'POST',
                data: {'data': first_data}
            });

            urlCalls.push(firststopPromise);

            //환승지가 있을 때에만 요청
            if(items.length == 2){
                var trans_data = {};
                trans_data.sid = items[1].sid;
                trans_data.cityennm = items[1].cityennm;
                trans_data.citycode = items[1].citycd;

                var transstopPromise = $http({
                    url: everbus_config.backend + '/stationDetail',
                    method: 'POST',
                    data: {'data': trans_data}
                });

                urlCalls.push(transstopPromise);
            }

            $q.all(urlCalls)
                .then(
                function(results) {
                    deferred.resolve(results);
                },
                function(errors) {
                    $window.alert(errors);
                });
            return deferred.promise;
        }
        return place_alltime_object;

    }])
    .factory('pathFactory',[function(){

        //pathFactory는 placedetail페이지에서 사용자가 선택한 path와 구글의 길찾기 객체를 담는 factory
        var pathObject = undefined;

        return {
            set_pathObject : function(path, dirObject){
                pathObject = {
                    path : path,
                    dirObject : dirObject
                }
            },
            get_pathObject : function(){
                return pathObject;
            }
        }
    }])
    .factory('pathNameFac',[function(){
        var pathName = undefined;
        return {
            set_pathName : function(startname, endname){
                pathName = {
                    startname : startname,
                    endname : endname
                }
            },
            get_pathName : function(){
                return pathName;
            }
        }
    }])
    .factory('placestopitemFac',[function() {
        var placestopitems = [];
        return {
            set_placestopitems: function (item) {
                placestopitems = item;
            },
            get_placestopitems: function () {
                return placestopitems;
            }
        }
    }])
    .factory('placestopsGPS',[function() {
        var placestopGPS = {};
        return {
            set_placestopGPS: function (items) {
                placestopGPS = items;
            },
            get_placestopGPS: function () {
                return placestopGPS;
            }
        }
    }]);




