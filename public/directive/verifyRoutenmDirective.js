/**
 * Created by kimsungwoo on 15. 7. 13..
 */
angular.module('globus.directive')
    .directive('verifyRoutenm',function() {
        return {
            restrict: 'E',
            scope: {
                routeNm: '=routeNm',
                routeType : '=routeType'
            },
            template: '<span style="color:{{font_color}}; font-size:16px;">{{colored_routenm}}</span>',

            link: function (scope, element, attributes, controller) {

                scope.font_color = undefined;
                scope.colored_routenm = undefined;

                switch (scope.routeType) {
                    case 1:
                        scope.font_color = "#1F5BFF";
                        break;
                    case 2:
                        scope.font_color = "#2CB5A3";
                        break;
                    case 3:
                        scope.font_color = "#BF3BE8";
                        break;
                    case 4:
                        scope.font_color = "#FF302F";
                        break;
                    case 5:
                        scope.font_color = "#FF302F";
                        break;
                    case 6:
                        scope.font_color = "#FF302F";
                        break;
                    case 7:
                        scope.font_color = "#E8A612";
                        break;
                    case 8:
                        scope.font_color = "#FF302F";
                        break;
                    case 9:
                        scope.font_color = "#5FD06E";
                        break;
                    case 10:
                        scope.font_color = "#5FD06E";
                        break;
                    case 11:
                        scope.font_color = "#FF302F";
                        break;
                    case 12:
                        scope.font_color = "#FF302F";
                        break;
                    case 13:
                        scope.font_color = "#E8A612";
                        break;
                    case 14:
                        scope.font_color = "#08DB32";
                        break;
                    case 15:
                        scope.font_color = "#1F5BFF";
                        break;
                    case 16:
                        scope.font_color = "#A09D9D";
                        break;
                    case 17:
                        scope.font_color = "#FF302F";
                        break;
                    case 18:
                        scope.font_color = "#4DACEB";
                        break;
                    case 19:
                        scope.font_color = "#000000";
                        break;
                    case 20:
                        scope.font_color = "#000000";
                        break;
                    case 21:
                        scope.font_color = "#FF302F";
                        break;
                    case 22:
                        scope.font_color = "#08DB32";
                        break;
                    case 23:
                        scope.font_color = "#E8A612";
                        break;
                    case 24:
                        scope.font_color = "#FF302F";
                        break;
                    case 25:
                        scope.font_color = "#FF302F";
                        break;
                    case 26:
                        scope.font_color = "#BF3BE8";
                        break;
                    case 27:
                        scope.font_color = "#FF302F";
                        break;
                }

                scope.colored_routenm = scope.routeNm;
            }
        }
    });