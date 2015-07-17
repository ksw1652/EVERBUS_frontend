/**
 * Created by kimsungwoo on 15. 6. 16..
 */
angular.module('globus.service')
    .factory('stationsearchlistCache',['$cacheFactory', function($cacheFactory){
        var cache = $cacheFactory("stationsearch");
        var backpage_cache = $cacheFactory("stationbackpage");
        var temp;
        return {
            set_stationbackpageCache : function(getStationnm, getList_data){
                var temp = {
                    stationnm : getStationnm,
                    list_data : getList_data
                }
                //전달받은 정류소 이름으로 cache의 키값 할당
                backpage_cache.put("stationbackpage", temp);
            },
            get_stationbackpageCache : function(){
                return backpage_cache.get("stationbackpage");
            },
            set_stationsearchlistCache : function(getStationnm, getList_data){
                temp = {
                    stationnm : getStationnm,
                    list_data : getList_data
                }
                //전달받은 정류소 이름으로 cache의 키값 할당
                cache.put("stationsearch", temp);
            },
            get_stationsearchlistCache : function(index, count){
                temp = cache.get("stationsearch");
                var station_resultCache ={};

                station_resultCache.stationnm = temp.stationnm;

                if(temp.list_data.length > 50) {
                    station_resultCache.list_data = temp.list_data.splice(index, count);
                } else {
                    station_resultCache.list_data = temp.list_data;
                }

                return station_resultCache;
            }
        }

    }]);