angular.module('globus.service')
    .factory('$route_detail',[
        '$http',
        '$q',
        '$window',
        'everbus_config',
        function($http,$q,$window,everbus_config){
        var route_detail_data = {};
        route_detail_data.getroutedetaildata = function(route_item){
            var data = {};
            data.rid = route_item.rid;
            data.citycode = route_item.citycd;
            data.cityennm = route_item.cityennm;

            var defer = $q.defer();
            $http({
                url: everbus_config.backend + '/routeDetail',    //http://121.184.187.5:3000/gettempdata
                method : 'POST',
                data : {'data' : data}/*,
                cache : true*/
            }).success(function(data,status,headers, config){
                /*console.log(data);*/
                defer.resolve(data);

            }).error(function(data, status, headers, config){
                $window.alert(data);
            });
            return defer.promise;
        };
        return route_detail_data;
    }])
    .factory('routeItemFac',[function(){
        var route_item = undefined;
        return {
            /*cityEnNm: "seoul"
            citycd: 101
            edstopnm: "웨딩타운"
            rid: 2
            routeid: 3600100
            routenm: "6001"
            routesubnm: "서울"
            ststopnm: "신구중학교"*/

            set_routeItem : function(item){
                route_item = item;
            },
            get_routeItem : function(){
                return route_item;
            }
        }
    }]);
