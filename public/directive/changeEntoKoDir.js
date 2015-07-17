/**
 * Created by kimsungwoo on 15. 5. 18..
 */
angular.module('globus.directive')
    .directive('changeEntoko',function() {
        return {
            restrict: 'E',
            scope: {
                getEnName: '=englishName'

            },
            template: '<span>{{koreanName}}</span>',

            link: function (scope, element, attributes, controller) {
                scope.koreanName = undefined;

                switch(scope.getEnName) {
                    case "seoul":
                        scope.koreanName = "서울";
                        break;
                    case "gyunggi":
                        scope.koreanName = "경기";
                        break;
                    case "incheon":
                        scope.koreanName = "인천";
                        break;
                    case "daegu":
                        scope.koreanName = "대구";
                        break;
                    case "ulsan":
                        scope.koreanName = "울산";
                        break;
                    case "chungju":
                        scope.koreanName = "청주";
                        break;
                    case "asan":
                        scope.koreanName = "아산";
                        break;
                    case "cheonan":
                        scope.koreanName = "천안";
                        break;
                    case "sejong":
                        scope.koreanName = "세종";
                        break;
                    case "busan":
                        scope.koreanName = "부산";
                        break;
                    case "changwon":
                        scope.koreanName = "창원";
                        break;
                    case "gumi":
                        scope.koreanName = "구미";
                        break;
                    case "tongyeong":
                        scope.koreanName = "통영";
                        break;
                    case "jinju":
                        scope.koreanName = "진주";
                        break;
                    case "gwangyang":
                        scope.koreanName = "광양";
                        break;
                    case "sunchun":
                        scope.koreanName = "순천";
                        break;
                    case "yeosu":
                        scope.koreanName = "여수";
                        break;
                    case "mokpo":
                        scope.koreanName = "목포";
                        break;
                    case "hwasoon":
                        scope.koreanName = "화순";
                        break;
                    case "jeonju":
                        scope.koreanName = "전주";
                        break;
                    case "daejeon":
                        scope.koreanName = "대전";
                        break;
                    case "pohang":
                        scope.koreanName = "포항";
                        break;
                    case "geoje":
                        scope.koreanName = "거제";
                        break;
                    case "gimhae":
                        scope.koreanName = "김해";
                        break;
                    case "chuncheon":
                        scope.koreanName = "춘천홍천";
                        break;
                    case "jeju":
                        scope.koreanName = "제주";
                        break;
                }

            }
        }
    });

