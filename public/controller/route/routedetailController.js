/**
 * Created by airnold on 14. 11. 23..
 */

/**
 * Created by airnold on 14. 11. 13..
 */
/*
routeid, routedesc : 실시간 정보에 필요한 id
rid, citycode : 우리 db조회시 필요한 id
*/
angular.module('globus.controller')
    .controller('routedetailController',[
        '$scope',
        'routedetaildata',
        '$location',
        "$route_detail",
        '$localStorage',
        "ngToast",
        "usSpinnerService",
        "$navigate",
        "routeItemFac",
        "stationItemFac",
        "$anchorScroll",
        "changeCitycdToEnNm",
        function($scope,routedetaildata,$location,$route_detail,
                 $localStorage, ngToast, usSpinnerService, $navigate, routeItemFac, stationItemFac, $anchorScroll, changeCitycdToEnNm){

            var stationroute = routedetaildata.dbObject[0];
            $scope.busposition_control = routedetaildata.urlRouteObject;

            //노선 정보 표시
            $scope.ststopnm = stationroute[0].ststopnm;
            $scope.edstopnm = stationroute[0].edstopnm;
            $scope.getTimeObject = routedetaildata.timeObject;
            $scope.termObject = JSON.parse(stationroute[0].TERM);


            //페이지의 최상단으로 anchor를 스크롤함
            $anchorScroll();


            /*var changed_trnsid = undefined;
            //회차지 값 지정
            if(stationroute[0].trnsid == '0' || stationroute[0].trnsid == null) {
                changed_trnsid = stationroute.length / 2;
            } else {
                changed_trnsid = stationroute[0].trnsid;
            }*/


            $scope.routenm = stationroute[0].routenm;

            $scope.updown_toggle = true;

            //정류소명 그리기

            if(stationroute[0].trnseq == null || stationroute[0].trnseq == stationroute.length){ //회차지 없는 경우
                $scope.trnseq_check = false;

                var temp=[];
                for(var i=0; i<stationroute.length; i++){ //회차지 까지의 상행 정류장 추출
                    temp.push(stationroute[i]);
                }

                $scope.upstation = temp;

            } else {
                $scope.trnseq_check = true;

                var temp=[];
                for(var i=0; i<=stationroute[0].trnseq-1; i++){ //회차지 까지의 상행 정류장 추출
                    temp.push(stationroute[i]);
                }

                $scope.upstation = temp;

                //trnseq 부터 dbobject 끝까지
                temp = [];
                for(var j=i; j<stationroute.length; j++) { //종점부터 회차지 까지 하행정류장 추출
                    temp.push(stationroute[j]);
                }
                $scope.downstation = temp;
            }

            //실시간 버스 위치 그리기
            $scope.positionCheck_up = function(seq){ //상행 정류장중 도착 예정 버스 표시
                var position_up = $scope.busposition_control[0];

                var i;
                for(i=0; i<position_up.length; i++) {
                    if(seq == position_up[i]){
                        break;
                    }
                }

                if(i != position_up.length){
                    return true;
                } else {
                    return false;
                }


            };

            $scope.positionCheck_down = function(seq) { //하행 정류장
                if(stationroute[0].trnseq == null || stationroute[0].trnseq == stationroute.length) { //단일 노선
                    return false;
                } else {
                    var position_down = $scope.busposition_control[1];

                    var i;
                    for(i=0; i<position_down.length; i++) {
                        if(seq - stationroute[0].trnseq == position_down[i]){
                            break;
                        }
                    }

                    if(i != position_down.length){
                        return true;
                    } else {
                        return false;
                    }
                }

            }

            $scope.back_toRoutesearch = function() {
                window.history.back();
            };

            $scope.refresh_routeData = function(){
                $scope.routeDetail_spin_value = true;
                usSpinnerService.spin('routeDetail_spinner');

                return $route_detail.getroutedetaildata(routeItemFac.get_routeItem())
                    .then(function(data){
                        usSpinnerService.stop('routeDetail_spinner');

                        $scope.routeDetail_spin_value = false;
                        $scope.busposition_control = data.urlRouteObject;
                    })
            };

            $scope.goRouteToStationDetail = function(station){
                usSpinnerService.spin('routeDetail_spinner');
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

                var temp = {};
                temp.arsid = station.arsid;
                temp.cityennm = changeCitycdToEnNm.change_toEnNm(station.citycd);
                temp.citycd = station.citycd;
                temp.sid = station.sid;
                temp.stopid = station.stopid;
                temp.stopnm = station.stopnm;

                stationItemFac.set_stationItem(temp);

                $location.path('/stationsearch/stationdetail');
            };


            $scope.star_o = true;
            $scope.star = false;


            if($localStorage.bookmarkList != undefined) {
                for (var i = 0; i < $localStorage.bookmarkList.length; i++) {
                    if ($localStorage.bookmarkList[i].citycd == routeItemFac.get_routeItem().citycd &&
                        $localStorage.bookmarkList[i].rid == routeItemFac.get_routeItem().rid) { //localstorage에 이미 추가한 즐겨찾기가 있다면
                        $scope.star_o = false;
                        $scope.star = true;
                    }
                }
            }

            $scope.addBookmark = function(){ //localStorage에 저장.
                var bookmarkList = $localStorage.bookmarkList;

                if(bookmarkList !== undefined) { //route 데이터가 존재하는 경우
                    var i;
                    for (i = 0; i < bookmarkList.length; i++) { //추가하려는 routeid가 존재하는지 검사
                        if(bookmarkList[i].citycd == routeItemFac.get_routeItem().citycd &&
                            bookmarkList[i].rid == routeItemFac.get_routeItem().rid) {
                            break;
                        }
                    }

                    if(i === bookmarkList.length) { //for문을 다 돌음 -> 중복 데이터 없음! 데이터 추가!
                        //stationdetail -> routedetail -> addbookmark
                        //위 순서로 즐겨찾기를 추가하면 시작정류소와 끝 정류소가 존재하지 않음
                        //따라서 필요 데이터를 추가하여 item객체 생성
                        var temp = routeItemFac.get_routeItem();
                        if(!temp.ststopnm){
                            /*temp.ststopnm = routedetaildata.dbObject[0].ststopnm;
                            temp.edstopnm = routedetaildata.dbObject[0].edstopnm;*/
                            temp.ststopnm = stationroute[0].ststopnm;
                            temp.edstopnm = stationroute[0].edstopnm;
                        }
                        temp.type = "route";

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

                    var temp = routeItemFac.get_routeItem();
                    if(!temp.ststopnm){
                        temp.ststopnm = stationroute[0].ststopnm;
                        temp.edstopnm = stationroute[0].edstopnm;
                        /*temp.ststopnm = routedetaildata.dbObject[0].ststopnm;
                        temp.edstopnm = routedetaildata.dbObject[0].edstopnm;*/
                    }
                    temp.type = "route";

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

            $scope.routeDetail_spin_value = false;
        }]);
