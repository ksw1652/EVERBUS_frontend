/**
 * Created by kimsungwoo on 15. 3. 16..
 */
angular.module('globus.controller')
    .controller('MainCtrl',['$scope', '$navigate', '$location',
        function($scope, $navigate, $location) {

            $scope.$navigate = $navigate;

            //활성화된 nav_btn에 표시 하는 코드
            //현재 nav버튼이 활성화 상태(사용자에 의해 눌림)이면 true반환
            //route_1 = /routesearch    route_2 = /routesearch/routedetail
            $scope.isActive = function(route_1, route_2, route_3) {
                if(route_1 == $location.path() || route_2 == $location.path() || route_3 == $location.path()) {
                    return true;
                } else {
                    return false;
                }

            }
        }]);
