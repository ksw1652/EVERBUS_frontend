/**
 * Created by airnold on 14. 11. 21..
 */
//autocompletefactory.js
angular.module('globus.service')
    .factory('$auto_complete',[
        '$http',
        '$q',
        '$window',
        '$localStorage',
        'everbus_config',
        function($http,$q,$window, $localStorage, everbus_config){
        var factory = {};
        factory.getAutocomplete = function(outerdata, service_flag){
            var autocomplete_datas = {};
            var data = {};
            var urlsetting = null;
            var region_array = [];

            //$localStroage에서 선택된 지역 읽어오기
            for(var i in $localStorage.region_checked_list){
                for(var j in $localStorage.region_checked_list[i].data){
                    if($localStorage.region_checked_list[i].data[j].checked == true){
                        var temp = {};
                        temp.citycode = $localStorage.region_checked_list[i].data[j].regioncode;
                        temp.cityennm = $localStorage.region_checked_list[i].data[j].regionennm;
                        region_array.push(temp);
                    }
                }
            }
            data.cityobject = region_array;

            if(service_flag === 1){
                data.routenm = outerdata;
                urlsetting = everbus_config.backend + '/routeSearch';//http://121.184.187.5:3000/routeAutocomplete
            }else if(service_flag === 2){
                data.stationnm = outerdata;
                urlsetting = everbus_config.backend + '/stationSearch';
            }

            //$http의 cache는 $http의 built-in caching 기능이며
            //$http자체적으로 "$http"라는 이름의 캐시를 만들어 cacheFactory로 저장한다.
            var defer = $q.defer();
            $http({
                url:urlsetting,
                method : 'POST',
                data : {'data' : data}/*,
                cache : true*/
            }).success(function(data,status,headers, config){
                defer.resolve(data);
            }).error(function(data, status, headers, config){
                $window.alert(data);
            });
            return defer.promise;
        };
        return factory;
    }]);
