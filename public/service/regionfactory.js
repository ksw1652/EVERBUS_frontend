/**
 * Created by kimsungwoo on 15. 2. 4..
 */
angular.module('globus.service')
    .factory('changeCitycdToEnNm',[function(){
        var cityennm = "";
        return {
            change_toEnNm : function(citycd){
                switch(citycd) {
                    case 101:
                        cityennm = "seoul";
                        break;
                    case 102:
                        cityennm = "gyunggi";
                        break;
                    case 103:
                        cityennm = "incheon";
                        break;
                    case 403:
                        cityennm = "daegu";
                        break;
                    case 402:
                        cityennm = "ulsan";
                        break;
                    case 303:
                        cityennm = "chungju";
                        break;
                    case 301:
                        cityennm = "asan";
                        break;
                    case 302:
                        cityennm = "cheonan";
                        break;
                    case 305:
                        cityennm = "sejong";
                        break;
                    case 401:
                        cityennm = "busan";
                        break;
                    case 404:
                        cityennm = "changwon";
                        break;
                    case 406:
                        cityennm = "gumi";
                        break;
                    case 409:
                        cityennm = "tongyeong";
                        break;
                    case 412:
                        cityennm = "jinju";
                        break;
                    case 501:
                        cityennm = "gwangyang";
                        break;
                    case 502:
                        cityennm = "sunchun";
                        break;
                    case 503:
                        cityennm = "yeosu";
                        break;
                    case 504:
                        cityennm = "jeonju";
                        break;
                    case 507:
                        cityennm = "mokpo";
                        break;
                    case 508:
                        cityennm = "hwasoon";
                        break;
                    case 304:
                        cityennm = "daejeon";
                        break;
                    case 408:
                        cityennm = "pohang";
                        break;
                    case 411:
                        cityennm = "geoje";
                        break;
                    case 405:
                        cityennm = "gimhae";
                        break;
                    case 201:
                        cityennm = "chuncheon";
                        break;
                    case 601:
                        cityennm = "jeju";
                        break;
                }
                return cityennm;
            }
        }
    }]);