/**
 * Created by kimsungwoo on 15. 6. 16..
 */
angular.module('globus.service')
    .factory('routesearchlistCache',['$cacheFactory', function($cacheFactory){
        var cache = $cacheFactory("routesearch");
        var backpage_cache = $cacheFactory("routebackpage");
        var temp;
        return {
            set_routebackpageCache : function(getRoutenm, getList_data){
                var temp = {
                    routenm : getRoutenm,
                    list_data : getList_data
                }
                //전달받은 정류소 이름으로 cache의 키값 할당
                backpage_cache.put("routebackpage", temp);
            },
            get_routebackpageCache : function(){
                return backpage_cache.get("routebackpage");
            },
            set_routesearchlistCache : function(getRoutenm, getList_data){
                temp = {
                    routenm : getRoutenm,
                    list_data : getList_data
                }
                //전달받은 정류소 이름으로 cache의 키값 할당
                cache.put("routesearch", temp);
            },
            get_routesearchlistCache : function(index, count){

                //캐싱된 정류소 검색 데이터를 내가 원하는 인덱스부터 해당 갯수만큼 가져올 수 있음.
                temp = cache.get("routesearch");
                var route_resultCache ={};

                route_resultCache.routenm = temp.routenm;

                if(temp.list_data.length > 50) {
                    route_resultCache.list_data = temp.list_data.splice(index, count);
                } else {
                    route_resultCache.list_data = temp.list_data;
                }

                return route_resultCache;
            }
        }

    }]);