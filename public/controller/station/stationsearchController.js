/**
 * Created by airnold on 14. 11. 13..
 */
angular.module('globus.controller')
    .controller('stationsearchController',[
        '$scope',
        '$auto_complete',
        '$location',
        '$modal',
        'usSpinnerService',
        '$navigate',
        '$localStorage',
        'stationItemFac',
        'stationsearchlistCache',
        'pageAnimateFac',
        '$timeout',
        function($scope,$auto_complete,$location, $modal, usSpinnerService,
                 $navigate, $localStorage, stationItemFac, stationsearchlistCache, pageAnimateFac, $timeout){

            $scope.animate_value = pageAnimateFac.get_animateParam();

            //정류소 최근검색 체크!
            $scope.station_search_check = false;
            $scope.station_recentlySearch = false;

            if($localStorage.recently_search_stationList == undefined || $localStorage.recently_search_stationList.length == 0 ) {
                $localStorage.recently_search_stationList = [];
                $scope.station_recentlySearch = false;
            } else {
                $scope.station_recentlySearch = true;
            }

            var service_flag = 2;

            //app.js의 run메서드에서 전파된 이벤트를 받음
            $scope.$on('station_backEvent', function(event, args){
                var station_cache = stationsearchlistCache.get_stationbackpageCache();
                if(station_cache && station_cache.stationnm != undefined){
                    $scope.search_stationnm = station_cache.stationnm;
                    $scope.station_displayedList = station_cache.list_data;
                    $scope.station_search_check = true;
                    $scope.station_recentlySearch = false;
                } else {
                    $scope.station_search_check = false;
                    $scope.station_recentlySearch = true;
                }
            });

            var firstcitycd;
            var citycd_checknum;
            $scope.lastsearch_index = 0;
            $scope.getData_length=0;
            $scope.difference=0;

            $scope.update = function(){
                if($scope.search_stationnm == ""){
                    $scope.station_search_check = false;
                    $scope.station_recentlySearch = true;
                }
                else{
                    $scope.station_search_check = true;
                    $scope.station_recentlySearch = false;

                    if ($scope.search_stationnm.length > 1) {
                        $auto_complete.getAutocomplete($scope.search_stationnm, service_flag).then(function(data){

                            $scope.getData_length = data[0].length;

                            stationsearchlistCache.set_stationsearchlistCache($scope.search_stationnm, data[0]);

                            //캐싱된 데이터중 원하는 양만큼만 가져옴.
                            $scope.station_displayedList = [];
                            $scope.station_displayedList = stationsearchlistCache.get_stationsearchlistCache(0,50).list_data;
                            $scope.lastsearch_index = $scope.station_displayedList.length;
                            $scope.difference = $scope.getData_length - $scope.station_displayedList.length;
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

            $scope.loadMore_station = function() {
                //difference는 아직 화면에 표시되지 못한, 보여 주어야할 데이터들
                if($scope.difference != 0){
                    if($scope.difference < 50){
                        $timeout(function() {
                            $scope.station_displayedList.push.apply($scope.station_displayedList,
                                stationsearchlistCache.get_stationsearchlistCache($scope.lastsearch_index, $scope.difference).list_data);
                        }, 500);
                    } else {
                        $timeout(function() {
                            $scope.station_displayedList.push.apply($scope.station_displayedList,
                                stationsearchlistCache.get_stationsearchlistCache($scope.lastsearch_index, 50).list_data);
                        }, 500);
                    }
                    $scope.lastsearch_index = $scope.station_displayedList.length;
                    $scope.difference = $scope.getData_length - $scope.station_displayedList.length;
                }
            }

            $scope.nullcheck_subname = function(routesubnm){
                if(routesubnm == null) {
                    return undefined;
                } else {
                    return routesubnm;
                }
            }

            $scope.goStationDetail = function(station_item){
                usSpinnerService.spin('stationSearch_spinner');

                var i;

                stationItemFac.set_stationItem(station_item);

                //최근 검색 중복값 체크. rid
                for(i=0; i < $localStorage.recently_search_stationList.length; i++) {
                    if(station_item.sid == $localStorage.recently_search_stationList[i].sid){
                        break;
                    }
                }

                if(i == $localStorage.recently_search_stationList.length) {
                    //중복값이 없다면
                    $localStorage.recently_search_stationList.push(station_item);

                } else {
                    //중복값이 존재하면
                    $localStorage.recently_search_stationList.splice(i, 1);
                    $localStorage.recently_search_stationList.push(station_item);

                }

                stationsearchlistCache.set_stationbackpageCache($scope.search_stationnm, $scope.station_displayedList);


                $location.path('/stationsearch/stationdetail');
            };

            //정류소 최근검색 삭제모달 open
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
                    var delete_index = $localStorage.recently_search_stationList.length-1-agreeDeleteItem_index;
                    $localStorage.recently_search_stationList.splice(delete_index, 1);
                    $scope.recently_search_stationList = $localStorage.recently_search_stationList;
                    if($localStorage.recently_search_stationList.length == 0) {
                        $scope.station_recentlySearch = false;
                    }
                });
            };

            var recent_length = $localStorage.recently_search_stationList.length;


            if(recent_length <= 5) {
                $scope.recently_search_stationList = $localStorage.recently_search_stationList;

            } else {
                $scope.recently_search_stationList = $localStorage.recently_search_stationList.slice(recent_length - 5, recent_length);

            }

        }]);
