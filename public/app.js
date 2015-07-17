angular.module('globus', [
    "globus.controller",
    "globus.directive",
    "globus.service",
    "globus.filter",
    "globus.config",
    "ngMap",
    "ngRoute",
    "ngAnimate",
    "ngTouch",
    'ajoslin.mobile-navigate',
    'pasvaz.bindonce',
    'vAccordion',
    'mn',
    'zInfiniteScroll',
    'angular.filter',
]).config(['$routeProvider',  function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl : 'views/notice/notice.html',
                controller : 'noticeController',
                level : 0,
                resolve : {
                    serverMessage : function($msg_onServer){
                        return $msg_onServer.getMessage().then(function(data){
                            return data;
                        })
                    }
                }
            })
            .when('/bookmark', {
                templateUrl:'views/bookmark/bookmark.html',
                controller : 'bookmarkController',
                level : 1
            })
            .when('/routesearch',{
                templateUrl : 'views/route/routesearch.html',
                controller : 'routesearchController',
                level : 2

            })
            .when('/routesearch/routedetail',{
                templateUrl : 'views/route/routedetail.html',
                controller : 'routedetailController',
                resolve : {
                    routedetaildata : function($route_detail, routeItemFac){
                        return $route_detail.getroutedetaildata(routeItemFac.get_routeItem())
                            .then(function(data){
                                /*console.log(data);*/
                                return data;
                            })
                    }
                }
            })
            .when('/stationsearch',{
                templateUrl : 'views/station/stationsearch.html',
                controller : 'stationsearchController',
                level : 3
            })
            .when('/stationsearch/stationdetail',{
                templateUrl : 'views/station/stationdetail.html',
                controller : 'stationdetailController',
                resolve : {
                    stationdetaildata : function($station_detail, stationItemFac){
                        return $station_detail.getstationdetaildata(stationItemFac.get_stationItem())
                            .then(function(data){
                                return data;
                            })
                    }
                }
            })
            .when('/placesearch', {
                templateUrl:'views/place/placesearch.html',
                controller : 'placesearchController',
                level : 4
            })
            .when('/placesearch/placedetail', {
                templateUrl : 'views/place/placedetail.html',
                controller : 'placedetailController',
                resolve : {
                    placeremaintimedata : function($place_alltime, placestopitemFac){
                        return $place_alltime.getplacedetaildata(placestopitemFac.get_placestopitems())
                            .then(function(data){
                                //then메서드가 있어야만 타이밍을 잡는다.
                                // 즉 http ajax요청 후 모두 성공적으로 값들이 리턴되었을 때에만 페이지 이동을 한다.
                                return data;
                            });
                    }
                }
            })
            .when('/placesearch/placedetail/placedetailfullmap', {
                templateUrl:'views/place/placedetailfullmap.html',
                controller : 'placedetailfullmapController'
            })
            .when('/contactus',{
                templateUrl : 'views/contactus/contactus.html',
                controller : 'contactusController',
                level : 5
            })
            .when('/contactus/contactusdetail',{
                templateUrl : 'views/contactus/contactusdetail.html',
                controller : 'contactusdetailController'
            })
            .otherwise({
                redirectTo : '/'
            });


    }])
    .run(function($rootScope, $location, $anchorScroll, pageAnimateFac){

        $rootScope.$on('$routeChangeSuccess', function(ev,current,previous) {
            if(current!=undefined && previous!=undefined && current.$$route != undefined && previous.$$route != undefined){
                if(current.$$route.level > previous.$$route.level) {
                    pageAnimateFac.set_animateParam("wow fadeInRight");
                } else if(current.$$route.level < previous.$$route.level) {
                    pageAnimateFac.set_animateParam("wow fadeInLeft");
                }
            }
        });

        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
        });

        $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
            //캐시된 stationlist데이터를 가져옴
            //rootScope에서 뒤로가기 이벤트를 감지하면 아래로 전파!!
            if($rootScope.actualLocation === newLocation) {
                if(newLocation == "/stationsearch"){
                    $rootScope.$broadcast('station_backEvent');
                }

                if(newLocation == "/routesearch"){
                    $rootScope.$broadcast('route_backEvent');
                }


            }
        });

        $anchorScroll.yOffset = 0;
    });

angular.module('globus.controller',
    [
        "ngAutocomplete",
        "ui.bootstrap",
        "ngStorage",
        "ngToast",
        "angularSpinner"
    ]);

angular.module('globus.directive', []);

angular.module('globus.service', []);

angular.module('globus.filter', []);

angular.module('globus.config', []);

