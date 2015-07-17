/**
 * Created by airnold on 14. 11. 13..
 */
angular.module('globus.controller')
    .controller('routesearchController',[
        '$scope',
        '$auto_complete',
        '$location',
        '$modal',
        'usSpinnerService',
        '$navigate',
        '$localStorage',
        'routeItemFac',
        'routesearchlistCache',
        'pageAnimateFac',
        '$timeout',
        function($scope,$auto_complete,$location, $modal, usSpinnerService,
                 $navigate, $localStorage, routeItemFac, routesearchlistCache, pageAnimateFac, $timeout){

            $scope.animate_value = pageAnimateFac.get_animateParam();

            //노선 최근검색 체크!
            $scope.route_search_check = false;
            $scope.route_recentlySearch = false;

            if($localStorage.recently_search_routeList == undefined || $localStorage.recently_search_routeList.length == 0 ) {
                //최근 검색 결과가 없으면
                $localStorage.recently_search_routeList = [];
                $scope.route_recentlySearch = false;
            } else {
                $scope.route_recentlySearch = true;
            }

            var service_flag = 1; //노선검색 자동완성 코드

            //app.js의 run메서드에서 전파된 이벤트를 받음
            $scope.$on('route_backEvent', function(event, args){
                var route_cache = routesearchlistCache.get_routebackpageCache();
                if(route_cache && route_cache.routenm != undefined){
                    $scope.search_routenm = route_cache.routenm;
                    $scope.route_displayedList = route_cache.list_data;
                    $scope.route_search_check = true;
                    $scope.route_recentlySearch = false;
                } else {
                    $scope.route_search_check = false;
                    $scope.route_recentlySearch = true;
                }
            });


            var firstcitycd;
            var citycd_checknum;
            $scope.lastsearch_index = 0;
            $scope.getData_length=0;
            $scope.difference=0;

            $scope.update = function(){
                if($scope.search_routenm == ""){
                    $scope.route_search_check = false;
                    $scope.route_recentlySearch = true;
                }
                else{
                    $scope.route_search_check = true;
                    $scope.route_recentlySearch = false;

                    //아래의 조건은 "5"일때 요청됨. "55"일때는 다시 요청되지 않음.
                    if ($scope.search_routenm.length > 0) {
                        $auto_complete.getAutocomplete($scope.search_routenm, service_flag).then(function(data){

                            //cacheFactory에 우선적으로 서버에서 가져온 searchlist를 전부 넣어둠
                            //이 데이터는 검색어가 추가 될 때마다 갱신됨. "5"와 "553"을 입력해서 가져온 데이터는 다름!
                            $scope.getData_length = data[0].length;

                            //지역 구분을 위해 받아온 data 지역 분류 후 cache에 set
                            routesearchlistCache.set_routesearchlistCache($scope.search_routenm, data[0]);

                            //캐싱된 데이터중 원하는 양만큼만 가져옴.
                            $scope.route_displayedList = [];
                            $scope.route_displayedList = routesearchlistCache.get_routesearchlistCache(0,50).list_data;
                            $scope.lastsearch_index = $scope.route_displayedList.length;
                            $scope.difference = $scope.getData_length - $scope.route_displayedList.length;
                            /*$scope.route_displayedList = data;*/
                            firstcitycd = undefined;
                            citycd_checknum = 0;
                        });
                    }
                }
            };

            $scope.check_topRegionDiv = function(getCitycd){
                if(citycd_checknum == 0){
                    citycd_checknum++;
                    firstcitycd = getCitycd;
                    return true;
                } else {
                    if(getCitycd == firstcitycd){
                        return false;
                    } else {
                        firstcitycd = getCitycd;
                        citycd_checknum = true;

                        return true;
                    }
                }
            }

            $scope.loadMore_route = function() {
                //difference는 아직 화면에 표시되지 못한, 보여 주어야할 데이터들

                if($scope.difference != 0){
                    if($scope.difference < 50){
                        $timeout(function() {
                            $scope.route_displayedList.push.apply($scope.route_displayedList,
                                routesearchlistCache.get_routesearchlistCache($scope.lastsearch_index, $scope.difference).list_data);
                        }, 500);
                    } else {
                        $timeout(function() {
                            $scope.route_displayedList.push.apply($scope.route_displayedList,
                                routesearchlistCache.get_routesearchlistCache($scope.lastsearch_index, 50).list_data);
                        }, 500);
                    }
                    $scope.lastsearch_index = $scope.route_displayedList.length;
                    $scope.difference = $scope.getData_length - $scope.route_displayedList.length;
                }
            }

            $scope.nullcheck_subname = function(routesubnm){
                if(routesubnm == null) {
                    return undefined;
                } else {
                    return routesubnm;
                }
            }

            //rid, citycd, cityEnNm, routenm, ststopnm, edstopnm
            //위 데이터들이 노선 정보의 한 단위가 됨.
            /*$scope.goRouteDetail = function(rid, citycd, cityEnNm, routenm, ststopnm, edstopnm){*/
            $scope.goRouteDetail = function(route_item){

                usSpinnerService.spin('routeSearch_spinner');

                var i;

                routeItemFac.set_routeItem(route_item);

                //최근 검색 중복값 체크. rid
                for(i=0; i < $localStorage.recently_search_routeList.length; i++) {
                    if(route_item.rid == $localStorage.recently_search_routeList[i].rid){
                        break;
                    }
                }

                if(i == $localStorage.recently_search_routeList.length) {
                    //중복값이 없다면
                    $localStorage.recently_search_routeList.push(route_item);

                } else {
                    //중복값이 존재하면
                    $localStorage.recently_search_routeList.splice(i, 1);
                    $localStorage.recently_search_routeList.push(route_item);

                }

                //검색을 통해 가져온 데이터가 50개 이상이면 캐시에 안넣는 걸로.
                routesearchlistCache.set_routebackpageCache($scope.search_routenm, $scope.route_displayedList);

                $location.path('/routesearch/routedetail');
            };

            //노선 최근검색 삭제모달 open
            $scope.open = function (index) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/modals/remove_recentSearchModal.html',
                    controller: 'removeModalCtrl',
                    resolve :{
                        selected_index : function(){
                            return index
                        }
                    }
                });
                modalInstance.result.then(function (agreeDeleteItem_index) {
                    var delete_index = $localStorage.recently_search_routeList.length-1-agreeDeleteItem_index;
                    $localStorage.recently_search_routeList.splice(delete_index, 1);
                    $scope.recently_search_routeList = $localStorage.recently_search_routeList;
                    if($localStorage.recently_search_routeList.length == 0) {
                        $scope.route_recentlySearch = false;
                    }
                });
            };

            //노선 최근 검색
            var recent_length = $localStorage.recently_search_routeList.length;

            //최근검색이 사용자에 의해 전무 삭제된 후 null값이 들어갔을 때
            /*if($localStorage.recently_search_routeList[0] == null){
                delete $localStorage.recently_search_routeList;
            }*/

            if(recent_length <= 5) {
                $scope.recently_search_routeList = $localStorage.recently_search_routeList;

            } else {
                $scope.recently_search_routeList = $localStorage.recently_search_routeList.slice(recent_length - 5, recent_length);

            }
        }]);
