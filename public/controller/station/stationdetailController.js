/**
 * Created by airnold on 14. 11. 25..
 */

angular.module('globus.controller')
    .controller('stationdetailController',[
        '$scope',
        '$auto_complete',
        '$location',
        'stationdetaildata',
        '$station_detail',
        "$route",
        '$localStorage',
        'ngToast',
        'usSpinnerService',
        "$navigate",
        "$anchorScroll",
        'routeItemFac',
        'stationItemFac',
        'changeCitycdToEnNm',
        'combimeDbUrlObject',
        function($scope,$auto_complete,$location,stationdetaildata,$station_detail,
                 $route, $localStorage, ngToast,
                 usSpinnerService, $navigate, $anchorScroll, routeItemFac, stationItemFac, changeCitycdToEnNm, combimeDbUrlObject){

            $anchorScroll();
            $scope.servicecode = 'station';
            $scope.star_o = true;
            $scope.star = false;

            var station_db = stationdetaildata.dbObject[0];
            var station_around = stationdetaildata.aroundXY[0];
            var station_urlObject = stationdetaildata.urlStationObject;

            //stationdetail 그리기
            //정류소 이름
            $scope.getStationNm = station_db[0].stopnm;

            //지도 좌표 설정
            $scope.mapCenter = "[" + station_db[0].latix + ","+ station_db[0].longy +"]";

            $scope.current_busstop = {
                position : [station_db[0].latix, station_db[0].longy]
            };
            //주변 정류소 표시
            $scope.non_busstops = station_around;

            //dbObject에는 해당 정류소에 '정차'하는 노선 목록 전체를 가져옴
            //urlStationObject에는 현제 도착 '예정' 노선 목록을 보여줌
            combimeDbUrlObject.combine_object(station_db, station_urlObject);
            $scope.station_routeList = combimeDbUrlObject.get_combined_object();

            /*$scope.routesubnm_check = function(getRouteid, getRoutenm){
                for(var i in station_db){
                    if(getRouteid == station_db[i].routeid ||
                        getRoutenm == station_db[i].routenm){
                        if(station_db[i].routesubnm != null){
                            return station_db[i].routesubnm;
                        } else {
                            return "";
                        }

                    }
                }
            }*/

            //stationdeatil의 depth는 2이다. 이때 지도상에서 다른 정류소를 클릭할 경우
            //마찬가지로 depth가 2이기 때문에 $navigate.go()메서드를 사용해도 페이지 변화가 일어나지 않았다.(SPA이기 때문)
            //최선의 방법은 사용자가 주변정류소를 클릭해서 원하는 정류소를 찾은 후 back버튼을 눌렀을 때 staionsearch 페이지로
            //넘어가는 것!! 때문에 기본 자바스크립트 코드로 뒤로가기를 구현하였다.
            $scope.back_toStationsearch = function(){
                window.history.back();
            }

            $scope.non_busstopClick = function(event, busstop) { //event객체는 directive에는 표시되지 않지만 컨트롤로에서는 표시해 주어야함.
                usSpinnerService.spin('stationDetail_spinner');

                stationItemFac.set_stationItem(busstop);

                $route.reload();
            };

            $scope.gostationToRouteDetail = function(route_item){
                if(route_item.rid != undefined){
                    console.log(route_item);
                    usSpinnerService.spin('stationDetail_spinner');

                    for(var i in station_db){
                        if(route_item.rid == station_db[i].rid){

                            var temp = station_db[i];
                            temp.cityennm = changeCitycdToEnNm.change_toEnNm(station_db[i].citycd);

                            routeItemFac.set_routeItem(temp);

                            $location.path('/routesearch/routedetail');
                        }
                    }
                }
            };

            $scope.routeItem_loading = false;

            $scope.refresh = function(){

                /*usSpinnerService.spin('stationDetail_spinner');*/
                $scope.routeItem_loading = true;
                setTimeout(function() {
                    $station_detail.getstationdetaildata(stationItemFac.get_stationItem()).then(function (data) {
                        /*usSpinnerService.stop('stationDetail_spinner');*/
                        //시간 갱신하는 것은 성공.
                        $scope.routeItem_loading = false;

                        combimeDbUrlObject.combine_object(data.dbObject[0], data.urlStationObject);
                        $scope.station_routeList = combimeDbUrlObject.get_combined_object();
                    });
                }, 1500);
            };


            if($localStorage.bookmarkList != undefined) {
                for (var i = 0; i < $localStorage.bookmarkList.length; i++) {
                    if ($localStorage.bookmarkList[i].citycd == stationItemFac.get_stationItem().citycd &&
                        $localStorage.bookmarkList[i].sid == stationItemFac.get_stationItem().sid) { //localstorage에 이미 추가한 즐겨찾기가 있다면
                        $scope.star_o = false;
                        $scope.star = true;
                    }
                }
            }

            $scope.addBookmark = function(){ //localStorage에 저장.
                var bookmarkList = $localStorage.bookmarkList;

                if(bookmarkList !== undefined) {
                    for (var i = 0; i < bookmarkList.length; i++) {
                        if(bookmarkList[i].citycd == stationItemFac.get_stationItem().citycd &&
                            bookmarkList[i].sid == stationItemFac.get_stationItem().sid) {
                            break;
                        }
                    }

                    if(i === bookmarkList.length) { //for문을 다 돌음 -> 중복 데이터 없음! 데이터 추가!
                        var temp = stationItemFac.get_stationItem();
                        if(!temp.arsid){
                            temp.arsid = station_db[0].arsid;
                        }
                        temp.type = "station";

                        bookmarkList.push(temp);
                        $scope.star_o = false;
                        $scope.star = true;
                        var msg = ngToast.create({
                            content: '즐겨찾기가 추가되었습니다',
                            className: 'success',
                            timeout: 2000,
                            dismissButton : false
                        });

                    } else {
                        $localStorage.bookmarkList.splice(i, 1);
                        if(!$localStorage.bookmarkList.length) { //배열이 비어있는것 확인
                            delete $localStorage.bookmarkList;
                        }
                        $scope.star_o = true;
                        $scope.star = false;
                        var msg = ngToast.create({
                            content: '즐겨찾기가 삭제 되었습니다',
                            className: 'danger',
                            timeout: 2000,
                            dismissButton : false
                        });
                    }
                } else { //undefined 이면 새로운 station 객체 생성
                    $localStorage.bookmarkList = [];

                    var temp = stationItemFac.get_stationItem();
                    if(!temp.arsid){
                        temp.arsid = station_db[0].arsid;
                    }

                    temp.type = "station";

                    $localStorage.bookmarkList.push(temp);
                    $scope.star_o = false;
                    $scope.star = true;

                    var msg = ngToast.create({
                        content: '즐겨찾기가 추가되었습니다',
                        className: 'success',
                        timeout: 2000,
                        dismissButton : false
                    });
                }
            }
        }]);
