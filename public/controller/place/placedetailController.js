/**
 * Created by airnold on 14. 11. 17..
 */
angular.module('globus.controller')
    .controller('placedetailController', [
        '$scope',
        '$location',
        'usSpinnerService',
        "$navigate",
        "$anchorScroll",
        "NavigatorGeolocation",
        'pathFactory',
        'pathNameFac',
        'changeCitycdToEnNm',
        'placeremaintimedata',
        '$station_detail',
        'placestopsGPS',
        function ($scope, $location, usSpinnerService, $navigate, $anchorScroll, NavigatorGeolocation, pathFactory,
                  pathNameFac, changeCitycdToEnNm, placeremaintimedata, $station_detail, placestopsGPS) {

            $anchorScroll();

            $scope.check_dirObject = false;

            //placesearch에서 가져온 경로 객체
            var pathObject = pathFactory.get_pathObject();


            //경로 이름 설정
            var pathNameObj = pathNameFac.get_pathName();
            $scope.pathName = pathNameObj.startname + " ~ " + pathNameObj.endname;

            $scope.center_position = "["+pathObject.path.fx + "," + pathObject.path.fy +"]";

            //도보 데이터가 존재할 때
            if(pathObject.dirObject != null) {

                $scope.check_dirObject = true;
                $scope.map_zoomOpt = "14";
                $scope.path_walking_dis = pathObject.dirObject.routes[0].legs[0].distance.text;

                $scope.travelMode = "TRANSIT"
                $scope.origin_position = "["+pathObject.dirObject.request.origin+"]"
                $scope.desti_position = "["+pathObject.dirObject.request.destination+"]"

                $scope.walk_time = pathObject.dirObject.routes[0].legs[0].duration.text;
            } else {

                $scope.check_dirObject = false;
                $scope.map_zoomOpt = "18";
            }

            //경로 총거리
            $scope.path_distance = pathObject.path.length;

            //출발지 정류장 노선별 예상도착시간
            var fstationdetaildata = placeremaintimedata[0].data.urlStationObject;

            //출발지 div
            $scope.froutenm = pathObject.path.froutenm;
            $scope.fstopnm = pathObject.path.fstopnm;

            $scope.busstop_inMap = pathObject.path.fstopnm;
            $scope.bus_inMap = pathObject.path.froutenm;

            if(fstationdetaildata != undefined) {
                for(var i in fstationdetaildata) {
                    if(pathObject.path.froutenm == fstationdetaildata[i].routenm ||
                        pathObject.path.frouteid == fstationdetaildata[i].routeid) {
                        break;
                    }
                }

                if(i == fstationdetaildata.length) {
                    $scope.fremain_time = "도착 예정 정보가 없습니다."
                } else {
                    $scope.fremain_time = fstationdetaildata[i].arrive_time;
                    $scope.fcur_pos = fstationdetaildata[i].cur_pos;
                }
            }


            $scope.check_trans = function(){
                //환승지 존재
                if(placeremaintimedata.length == 2){

                    var tstationdetaildata = placeremaintimedata[1].data.urlStationObject;

                    if(tstationdetaildata != undefined) {
                        $scope.tstopnm = pathObject.path.tstopnm;
                        $scope.troutenm = pathObject.path.troutenm;

                        //환승지 시간 추출
                        for (i = 0; i < tstationdetaildata.length; i++) {
                            if (pathObject.path.troutenm == tstationdetaildata[i].routenm ||
                                pathObject.path.trouteid == tstationdetaildata[i].routeid) {
                                break;
                            }
                        }
                        if (i == tstationdetaildata.length) {
                            $scope.tremain_time = "도착 예정 정보가 없습니다."
                        } else {
                            $scope.tremain_time = tstationdetaildata[i].arrive_time;
                            $scope.tcur_pos = tstationdetaildata[i].cur_pos;
                        }

                        return true;
                    }
                } else {
                    return false;
                }
            }

            //도착지 div
            $scope.estopnm = pathObject.path.estopnm;

            $scope.first_loading = false;

            $scope.getFirstStationDetail = function(){
                $scope.first_loading = true;
                var first_data = {};
                first_data.sid = pathObject.path.fsid;
                first_data.citycd = pathObject.path.citycd;
                first_data.cityennm = changeCitycdToEnNm.change_toEnNm(pathObject.path.citycd);

                //데이터가 갱신중이라는 것을 보여주기 위하여 일부러 timeout함수를 걸어둠. 2.5초
                setTimeout(function(){
                    $station_detail.getstationdetaildata(first_data)
                        .then(function(data){
                            $scope.first_loading = false;

                            var getDbObject = data.dbObject[0];
                            $scope.center_position = "["+getDbObject[0].latix + "," + getDbObject[0].longy + "]";

                            $scope.busstop_inMap = pathObject.path.fstopnm;
                            $scope.bus_inMap = pathObject.path.froutenm;

                            var i;
                            for(i=0; i < data.urlStationObject.length; i++) {
                                if(pathObject.path.froutenm == data.urlStationObject[i].routenm ||
                                    pathObject.path.frouteid == data.urlStationObject[i].routeid) {
                                    break;
                                }
                            }

                            if(i == data.urlStationObject.length) {
                                $scope.fremain_time = "도착 예정 정보가 없습니다."
                            } else {
                                $scope.fremain_time = data.urlStationObject[i].arrive_time;
                            }
                        })
                }, 1500);
            }

            $scope.trans_loading = false;

            $scope.getTrnsStationDetail = function(){
                $scope.trans_loading = true;
                var trans_data = {};
                trans_data.sid = pathObject.path.tsid;
                trans_data.citycd = pathObject.path.citycd;
                trans_data.cityennm = changeCitycdToEnNm.change_toEnNm(pathObject.path.citycd);

                //데이터가 갱신중이라는 것을 보여주기 위하여 일부러 timeout함수를 걸어둠. 2.5초
                setTimeout(function(){
                    $station_detail.getstationdetaildata(trans_data)
                        .then(function(data){
                            $scope.trans_loading = false;

                            var getDbObject = data.dbObject[0];
                            $scope.center_position = "["+getDbObject[0].latix + "," + getDbObject[0].longy + "]";

                            $scope.busstop_inMap = pathObject.path.tstopnm;
                            $scope.bus_inMap = pathObject.path.troutenm;

                            //환승지 시간 추출
                            var i;
                            for(i=0; i<data.urlStationObject.length; i++) {
                                if(pathObject.path.troutenm == data.urlStationObject[i].routenm ||
                                    pathObject.path.trouteid == data.urlStationObject[i].routeid) {
                                    break;
                                }
                            }
                            if(i == data.urlStationObject.length) {
                                $scope.tremain_time = "도착 예정 정보가 없습니다."
                            } else {
                                $scope.tremain_time = data.urlStationObject[i].arrive_time;
                            }
                        })
                }, 1500);
            }

            //travelMode가 WALKING일 경우 도보 경로 데이터를 가져오지 못함! 구글 병신!!
            //때문에 TRANSIT로 설정해주어야 현재위치 --> 정류소 까지의 경로를 가져다줌
            //(도보에 대한 경로는 세세하게 표현되지 않으며 단순히 두점 사이의 거리만을 그려줌)
            /*$scope.travelMode = "TRANSIT";
            $scope.desti_position =[36.769213,126.950129];*/


            /*var current_position = new google.maps.LatLng($scope.current_position);
            $scope.click = function() {
                $scope.map.setCenter(current_position);
            }*/
            //navbar상단에 검색한 경로 ex) 세절역 ~ 상수역 표시
            /*$scope.top_pathList = pathListFac.get_pathlist().startname + " ~ " + pathListFac.get_pathlist().endname;

            $scope.all_dis = place_data.getdata().distance[0]/1000;
            $scope.all_hour = Math.floor(place_data.getdata().time[0]/60);
            $scope.all_minute = place_data.getdata().time[0]%60;

            $scope.detail_data = placedetaildata; //좌표와 시간
            $scope.place_data = place_data.getdata(); //경로
            $scope.servicecode = "place";

            if("routexy" in $scope.detail_data && "timedata" in $scope.detail_data){ //지도좌표와 예상도착시간이 모두 존재할떄
                $scope.dataCheck = true;

                $scope.center = {
                    position : [$scope.detail_data.routexy[0].longy, $scope.detail_data.routexy[0].latx]
                };

                $scope.arrowPositions = {
                    arrowPo_start: [$scope.detail_data.routexy[0].longy, $scope.detail_data.routexy[0].latx],
                    arrowPo_end: [$scope.detail_data.routexy[3].longy, $scope.detail_data.routexy[3].latx]
                };

                $scope.timerstatecode = 0;
                $scope.remainTimedata = placedetaildata.timedata.kals1;
                $scope.last = placedetaildata.timedata.isLast1;


                $scope.getdetaildata = function (fid, fname, routeid, routenm, fx, fy, index) {
                    usSpinnerService.spin('placeDetail_spinner');

                    $scope.remain_timedata = "0";

                    var data = {};
                    data.samedata = place_data.fid_arsid(fid, fname);
                    data.routeid = routeid;
                    data.routenm = routenm;
                    data.fx = fx;
                    data.fy = fy;

                    $place_detail.place_detail(data).then(function (data) {
                        $scope.center = {
                            position : [data.routexy[0].longy, data.routexy[0].latx]
                        };
                        $scope.arrowPositions = {

                            arrowPo_start: [data.routexy[0].longy, data.routexy[0].latx],
                            arrowPo_end: [data.routexy[3].longy, data.routexy[3].latx]
                        };

                        $scope.timerstatecode = index;

                        $scope.remainTimedata = data.timedata.kals1;
                        $scope.last = data.timedata.isLast1;
                        usSpinnerService.stop('placeDetail_spinner');

                    });
                };

            } else {
                $scope.dataCheck = false;
                $scope.infoMsgDiv = true;
                $scope.infoMsg = "지도데이터와 경로데이터가 존재하지 않습니다"
            }*/

            $scope.back_toPlacesearch = function() {
                $navigate.back();
            }

            $scope.goFullscreen = function(){
                var items = {};
                items.fx = pathObject.path.fx;
                items.fy = pathObject.path.fy;

                if(pathObject.path.tx != ""){
                    items.tx = pathObject.path.tx;
                    items.ty = pathObject.path.ty;
                }
                items.ex = pathObject.path.ex;
                items.ey = pathObject.path.ey;

                placestopsGPS.set_placestopGPS(items);

                $location.path('/placesearch/placedetail/placedetailfullmap');
            }
        }]);
