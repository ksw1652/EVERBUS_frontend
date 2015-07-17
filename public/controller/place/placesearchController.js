angular.module('globus.controller')
    .controller('placesearchController',[
        '$scope',
        '$place_search',
        '$window',
        '$location',
        'usSpinnerService',
        'NavigatorGeolocation',
        'pathFactory',
        'pathNameFac',
        '$navigate',
        'pageAnimateFac',
        'placestopitemFac',
        'changeCitycdToEnNm',
        function($scope,$place_search,$window,$location,usSpinnerService, NavigatorGeolocation,
                 pathFactory, pathNameFac, $navigate, pageAnimateFac, placestopitemFac, changeCitycdToEnNm){

            $scope.animate_value = pageAnimateFac.get_animateParam();

            $scope.startinfo_details = undefined;
            $scope.endinfo_details = undefined;
            $scope.walking_data = false;
            var startname = undefined;
            var endname = undefined;
            var data = {};

            $scope.options = {
                country: 'KR'
            };

            //googole의 길찾기 서비스인 directionsService객체를 가져옴.
            var directionsService = new google.maps.DirectionsService();

            var lat, lng = undefined;
            var current_position = [];

            //현재위치 추출
            NavigatorGeolocation.getCurrentPosition().then(function(position){
                lat = position.coords.latitude, lng = position.coords.longitude;
                current_position = [lat, lng];
            });

            $scope.search = function() {
                $scope.short_time_flag = true;

                usSpinnerService.spin('placeSearch_spinner');

                data.sx = $scope.startinfo_details.geometry.location.A;
                data.sy = $scope.startinfo_details.geometry.location.F;
                data.ex = $scope.endinfo_details.geometry.location.A;
                data.ey = $scope.endinfo_details.geometry.location.F;

                //place검색의 navbar에 pathName를 표시하기 위해 set함.
                pathNameFac.set_pathName($scope.startinfo_details.name, $scope.endinfo_details.name);

                //경로정보 우리서버에 요청
                $place_search.place_search(data).then(function(data){
                    var getPlacesearch_data = data[0];

                    if(getPlacesearch_data[0].msg == undefined || getPlacesearch_data[0].length){
                        var pathList = data[0];
                        $scope.placeSearch_pathList = pathList;

                        //현재위치 --> 첫번째 정류소 까지의 길찾기

                        calcRoute(current_position[0], current_position[1], pathList[0].flatix, pathList[0].flongy);
                    } else {
                        window.alert("경로를 찾을 수 없습니다.");
                    }

                    usSpinnerService.stop('placeSearch_spinner');
                }, function(error){
                    usSpinnerService.stop('placeSearch_spinner');
                    $window.alert(error);
                });
            };

            $scope.goPlaceDetail = function(path, dirObject){
                usSpinnerService.spin('placeSearch_spinner');

                pathFactory.set_pathObject(path, dirObject);
                var place_request_array=[];
                var temp = {};
                temp.sid = path.fsid;
                temp.citycd = path.citycd;
                temp.cityennm = changeCitycdToEnNm.change_toEnNm(path.citycd);

                place_request_array.push(temp);


                if(path.tsid != null){
                    temp={};
                    temp.sid = path.tsid;
                    temp.citycd = path.citycd;
                    temp.cityennm = changeCitycdToEnNm.change_toEnNm(path.citycd);
                    place_request_array.push(temp);
                }

                placestopitemFac.set_placestopitems(place_request_array);

                $location.path('/placesearch/placedetail');
            };


            function calcRoute(currentX, currentY, startX, startY) {
                var current = currentX + "," + currentY;
                var start = startX + "," + startY;

                var transit_request = {
                    origin: current,
                    destination: start,
                    optimizeWaypoints: false,
                    travelMode: google.maps.TravelMode.TRANSIT
                };


                directionsService.route(transit_request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        //걷는 거리 제한을 두긴 둬야함.
                        //이 서비스를 통해 가져오는 WALKING의 거리는 1km, 즉 현재 위치기준 출발지까지의 거리가 1km이내 여야만 이서비스를 이용한다 가정.
                        if(response.routes[0].legs[0].distance.value < 1000) {
                            for(var i in response.routes[0].legs[0].steps) {
                                //steps 중 travel_mode가 WALKING인 것만 찾음 --> 도보 데이터
                                if(response.routes[0].legs[0].steps[i].travel_mode == "WALKING") {
                                    $scope.walking_data = true;
                                    $scope.walk_dis = response.routes[0].legs[0].steps[i].distance.value;
                                    $scope.walk_time = response.routes[0].legs[0].duration.text;
                                    $scope.google_directionObject = response;
                                    break;
                                }
                            }
                        } else {
                            //총거리가 1km를 넘음 --> 현재위치기준 출발지까지의 거리가 너무 멀때
                            $scope.walking_data = false;
                            $scope.google_directionObject = null;
                        }


                    }
                });
            }
        }]);
