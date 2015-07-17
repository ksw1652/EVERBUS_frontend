/**
 * Created by kimsungwoo on 15. 6. 24..
 */
angular.module('globus.controller')
    .controller('placedetailfullmapController',[
        '$scope',
        'pathNameFac',
        'placestopsGPS',
        'pathFactory',
        '$window',
        function($scope, pathNameFac, placestopsGPS, pathFactory, $window){

            $scope.animate_value = "wow slideInUp";


            //기기별 스크린 사이즈 얻어오기
            $scope.screen_height = $window.innerHeight;

            var pathNameObj = pathNameFac.get_pathName();
            $scope.pathName = pathNameObj.startname + " ~ " + pathNameObj.endname;

            var pathObject = pathFactory.get_pathObject();
            var GPSObject = placestopsGPS.get_placestopGPS();



            $scope.fstop_position = "["+ GPSObject.fx + "," + GPSObject.fy +"]";
            $scope.fbusstop_inMap = pathObject.path.fstopnm;
            $scope.fbus_inMap = pathObject.path.froutenm;
            $scope.fstop_num = "1";

            $scope.trans_check = false;
            if(GPSObject.tx != undefined){
                $scope.trans_check = true;
                $scope.tstop_position = "["+ GPSObject.tx + "," + GPSObject.ty +"]";
                $scope.tbusstop_inMap = pathObject.path.tstopnm;
                $scope.tbus_inMap = pathObject.path.troutenm;
                $scope.tstop_num = "2";
                $scope.estop_num = "3";
                var center_latix = (GPSObject.fx + GPSObject.tx + GPSObject.ex) / 3 ;
                var center_longy = (GPSObject.fy + GPSObject.ty + GPSObject.ey) / 3;
            } else {
                $scope.estop_num = "2";
                var center_latix = (GPSObject.fx + GPSObject.ex) / 2 ;
                var center_longy = (GPSObject.fy + GPSObject.ey) / 2;
            }

            $scope.estop_position = "["+ GPSObject.ex + "," + GPSObject.ey +"]";
            $scope.ebusstop_inMap = pathObject.path.estopnm;



            $scope.center_position = "["+ center_latix + "," + center_longy +"]";
            /*$scope.zoom_level = "13";*/

            var myMap;
            $scope.$on('mapInitialized', function(evt, evtMap) {
                myMap = evtMap;

                /*var myloc = new google.maps.Marker({
                    clickable: false,
                    icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                        new google.maps.Size(22,22),
                        new google.maps.Point(0,18),
                        new google.maps.Point(11,11)),
                    shadow: null,
                    zIndex: 999,
                    map: myMap
                });

                if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
                    var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                    myloc.setPosition(me);
                }, function(error) {
                    // ...
                });*/

                var bounds = new google.maps.LatLngBounds();

                var flatlng = new google.maps.LatLng(GPSObject.fx, GPSObject.fy);
                if(GPSObject.tx != undefined){
                    var tlatlng = new google.maps.LatLng(GPSObject.tx, GPSObject.ty);
                }
                var elatlng = new google.maps.LatLng(GPSObject.ex, GPSObject.ey);
                bounds.extend(flatlng);
                bounds.extend(tlatlng);
                bounds.extend(elatlng);
                myMap.fitBounds(bounds);


            });



            $scope.fbus_icon = "/images/busStop_inMap.png"
            $scope.tbus_icon = "/images/non_busStop_inMap.png"
            $scope.ebus_icon = "/images/non_busStop_inMap.png"

            $scope.click = function(event, param){
                var pos;

                myMap.setZoom(16);
                if(param == 'first') {
                    $scope.fbus_icon = "/images/busStop_inMap.png"
                    $scope.tbus_icon = "/images/non_busStop_inMap.png"
                    $scope.ebus_icon = "/images/non_busStop_inMap.png"

                    $scope.center_position = "["+ GPSObject.fx + "," + GPSObject.fy +"]";

                } else if(param == 'trn'){

                    $scope.fbus_icon = "/images/non_busStop_inMap.png"
                    $scope.tbus_icon = "/images/busStop_inMap.png"
                    $scope.ebus_icon = "/images/non_busStop_inMap.png"

                    $scope.center_position = "["+ GPSObject.tx + "," + GPSObject.ty +"]";

                } else {
                    $scope.fbus_icon = "/images/non_busStop_inMap.png"
                    $scope.tbus_icon = "/images/non_busStop_inMap.png"
                    $scope.ebus_icon = "/images/busStop_inMap.png"

                    $scope.center_position = "["+ GPSObject.ex + "," + GPSObject.ey +"]";

                }
            }


            $scope.back_toPlacedetail = function(){
                window.history.back();
            }
        }]);
