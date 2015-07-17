//busDirective --> route_detail에서 정류소별 해당노선 도착정보를 가져옴. (붉은색으로 표시)
angular.module('globus.directive')
    .directive('remainTime',function($timeout,clearTimer){
        return{
            restrict : 'E',
            scope : {
                dirarrivetime : '=arriveTime',
                servicecode : '=serviceCode'
            },
            template : '<div><h5>{{total}}</h5></div>',

            link: function(scope, element, attributes, controller){
                scope.$watch('dirarrivetime', function() {
                    scope.minutes = undefined;
                    scope.seconds = undefined;
                    scope.total = undefined;

                    scope.minutes = Math.floor(scope.dirarrivetime / 60);
                    scope.seconds = scope.dirarrivetime - (scope.minutes * 60);
                    if(Math.floor(scope.dirarrivetime / 60) == 0) {
                        scope.total = "잠시 후 도착합니다";
                    } else {
                        scope.total = "약 "+scope.minutes + "분 " + scope.seconds + "초 후 도착";
                    }

                /*scope.minutes = Math.floor(scope.dirarrivetime / 60); //math.floor --> '내림' 함수
                scope.seconds = scope.dirarrivetime - (scope.minutes * 60);

                if(Math.floor(scope.dirarrivetime / 60) == 0) {
                    scope.total = "잠시 후 도착합니다";
                } else {
                    scope.total = "약 "+scope.minutes + "분 " + scope.seconds + "초 후 도착";
                }

                if(scope.servicecode === 'place'){
                    var temptimer = clearTimer.get_alltimer();
                    if(temptimer === undefined){

                    }else{
                        $timeout.cancel(temptimer);
                    }
                }
*/
                })
            }
        }
    })
/*    .directive('remainTime',function($timeout,clearTimer){
        return{
            restrict : 'E',
            scope : {
                dirarrivetime : '=arriveTime',
                lastcheck : '=isLast',
                servicecode : '=serviceCode'
            },
            template : '<div><h5>{{total}}</h5></div><div class="pull-right" style="font-size: 8pt; color: #d4081a;">{{lastString}}</div>',

            link: function(scope, element, attributes, controller){
                scope.$watch('dirarrivetime', function() {

                    scope.realarrivetime = undefined;
                    scope.minutes = undefined;
                    scope.seconds = undefined;
                    scope.total = undefined;
                    *//*scope.isLastCheck = undefined;
                    scope.lastString = undefined;*//*

                    if(scope.servicecode === 'place'){
                        var temptimer = clearTimer.get_alltimer();
                        if(temptimer === undefined){

                        }else{
                            $timeout.cancel(temptimer);
                        }
                    }

                    var arriveinfo = function(){
                        scope.realarrivetime = scope.dirarrivetime;
                        arrivecountdown();

                    };

                    var arrivecountdown = function(){
                        scope.realarrivetime -= 1;
                        if(scope.realarrivetime < 0){
                            scope.total = "버스가 도착하였습니다";
                            $timeout.cancel(arrivecountdown);
                        }
                        else{
                            scope.minutes = Math.floor(scope.realarrivetime / 60); //math.floor --> '내림' 함수
                            scope.seconds = scope.realarrivetime - (scope.minutes * 60);

                            if(Math.floor(scope.realarrivetime / 60) == 0) {
                                scope.total = "잠시 후 도착합니다";
                            } else {
                                scope.total = "약 "+scope.minutes + "분 " + scope.seconds + "초 후 도착";
                            }
                            temptimer = $timeout(arrivecountdown,1000);
                            clearTimer.set_timer(temptimer);
                        }
                    };
                    arriveinfo();
                });

            }

        }
    })
    */
    /*.directive('lastArrivecheck',function($timeout) {
        return {
            restrict: 'E',
            scope: {
                isarrive: '=isArrive1'
            },
            template: '<div style="font-size: 8pt; color: #000088">{{total}}</div>',
            link: function (scope, element, attributes, controller) {
                scope.total="";
                scope.arriveCheck = undefined;

                scope.arriveCheck = scope.isarrive; //arriveCheck는 해당 노선이 전 정류장을 항햐여 운행중일 경우 값이 0, 도착하였을 경우 값이 1이 됨.
                if(scope.arriveCheck == 1){
                    scope.total = "이전 정류소에 도착하였습니다";
                } else {
                    scope.total="";
                }
            }
        }
    })*/
    .directive('soonArrive',function($timeout) { //잠시후 도착 패널에 표시하기 위한 사용자 정의 디렉티브
        return {
            restrict: 'A',
            scope: {
                dirarrivetime: '=arriveTime',
                routename : '=routeName',
                showValue : '=showvalueIndir'
            },
            template: '{{soonArriveBus}}',

            link: function (scope, element, attributes, controller) {
                scope.realarrivetime = undefined;
                scope.soonArriveBus = undefined;

                var stopTimer = function() {
                    $timeout.cancel(arrivecountdown);
                };

                var arrivecountdown = function(){
                    scope.realarrivetime -= 1;
                    if(scope.realarrivetime < 0){
                        scope.showValue = false;
                        stopTimer();
                    }
                    else {
                        if(scope.realarrivetime < 60){
                            scope.showValue = true;
                            scope.soonArriveBus = scope.routename;
                        }
                        $timeout(arrivecountdown, 1000);
                    }
                };

                $timeout(function() {
                    /*if(scope.regioncode == '31'){ //경기 -> 경기는 시간 데이터를 '분'으로 받아옴
                        scope.realarrivetime = scope.dirarrivetime * 60;
                        arrivecountdown();

                    } else { //서울 실시간 버스 정보
                        if (scope.lastcheck == '1') { // 막차
                            scope.realarrivetime = scope.dirarrivetime;
                            arrivecountdown();
                        } else if (scope.lastcheck == '-2') { //운행종료
                            return;
                        } else if(scope.lastcheck == '-1') { //차고지 출발 준비중
                            scope.total = "출발 준비중";
                            return;
                        }
                        else {
                            scope.realarrivetime = scope.dirarrivetime;
                            arrivecountdown();
                        }
                    }
                }, 1000);*/
                }, 1000);
                    scope.realarrivetime = scope.dirarrivetime;
                    arrivecountdown();
            }
        }
    });