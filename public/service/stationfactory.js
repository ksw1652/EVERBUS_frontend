angular.module('globus.service')
    .factory('$station_detail',[
        '$http',
        '$q',
        '$window',
        'everbus_config',
        function($http,$q,$window,everbus_config){
        var station_detail_data = {};
        //sid
        //cityEnNm
        //cityCode
        station_detail_data.getstationdetaildata = function(station_item){
            var data = {};
            data.sid = station_item.sid;
            data.cityennm = station_item.cityennm;
            data.citycode = station_item.citycd;

            var defer = $q.defer();
            $http({
                url : everbus_config.backend + '/stationDetail',
                method : 'POST',
                data : {'data' : data}
            }).success(function(data,status,headers, config){
                defer.resolve(data);
            }).error(function(data, status, headers, config){
                /*defer.reject(data);*/
                $window.alert(data);
            });
            return defer.promise;


        };
        return station_detail_data;
    }])
    .factory('stationItemFac',[function(){
        /*
            $$hashKey: "object:112"
              cityEnNm: "seoul"
              citycd: 101
            edstopnm: "강남역"
            firsttm: "04:00"
            lasttm: "23:00"
            rid: 52
            routedesc: null
            routeid: 3014500
            routenm: "145"
            seq: 95
              sid: 1918
              stopid: "726"
              stopnm: "강북보건소"
            ststopnm: "번동"
            term: "9"
            trnsid: 48
            vFlag: "1"
        */
        /*
             arsid: "09013"
               cityEnNm: "seoul"
               citycd: 101
             latiX: 37.638477
             longY: 127.0261
               sid: 635
               stopid: "13493"
               stopnm: "수유(강북구청)역"
        */
        var station_item = undefined;
        return {
            set_stationItem : function(item){
                station_item = item;
            },
            get_stationItem : function(){
                return station_item;
            }
        }
    }]);
