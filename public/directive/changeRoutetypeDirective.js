/**
 * Created by kimsungwoo on 15. 7. 14..
 * directive for change roytetype to Korean
 */
angular.module('globus.directive')
    .directive('changeRoutetype',function() {
        return {
            restrict: 'E',
            scope: {
                routeType: '=routeType'

            },
            template: '{{routeKorean != null ? "(" + routeKorean + "버스)" : ""}}',

            link: function (scope, element, attributes, controller) {
                switch(scope.routeType) {
                    case 1:
                        scope.routeKorean = "간선";
                        break;
                    case 2:
                        scope.routeKorean = "경기";
                        break;
                    case 3:
                        scope.routeKorean = "공항";
                        break;
                    case 4:
                        scope.routeKorean = "광역";
                        break;
                    case 5:
                        scope.routeKorean = "급행";
                        break;
                    case 6:
                        scope.routeKorean = "급행간선";
                        break;
                    case 7:
                        scope.routeKorean = "농촌";
                        break;
                    case 8:
                        scope.routeKorean = "대전광역";
                        break;
                    case 9:
                        scope.routeKorean = "마을";
                        break;
                    case 10:
                        scope.routeKorean = "마중";
                        break;
                    case 11:
                        scope.routeKorean = "부산노선";
                        break;
                    case 12:
                        scope.routeKorean = "세종광역";
                        break;
                    case 13:
                        scope.routeKorean = "순환";
                        break;
                    case 14:
                        scope.routeKorean = "시내";
                        break;
                    case 15:
                        scope.routeKorean = "시외";
                        break;
                    case 16:
                        scope.routeKorean = "심야";
                        break;
                    case 17:
                        scope.routeKorean = "외곽";
                        break;
                    case 18:
                        scope.routeKorean = "인천";
                        break;
                    case 19:
                        scope.routeKorean = "일반";
                        break;
                    case 20:
                        scope.routeKorean = "장유노선";
                        break;
                    case 21:
                        scope.routeKorean = "좌석";
                        break;
                    case 22:
                        scope.routeKorean = "지선";
                        break;
                    case 23:
                        scope.routeKorean = "지선(순환)";
                        break;
                    case 24:
                        scope.routeKorean = "직행";
                        break;
                    case 25:
                        scope.routeKorean = "직행좌석";
                        break;
                    case 26:
                        scope.routeKorean = "첨단";
                        break;
                    case 27:
                        scope.routeKorean = "청주광역";
                        break;
                }
            }
        }
    });
