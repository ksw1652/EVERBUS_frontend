/**
 * Created by kimsungwoo on 15. 2. 3..
 */

angular.module('globus.controller')
    .controller('noticeController',[
        '$scope',
        'serverMessage',
        '$localStorage',
        '$location',
        '$navigate',
        '$modal',
        'pageAnimateFac',
        function($scope, serverMessage, $localStorage, $location, $navigate, $modal, pageAnimateFac) {

            $scope.animate_value = pageAnimateFac.get_animateParam();


            console.log(serverMessage);

            $scope.app_version = serverMessage.app_version;
            $scope.notice_message = serverMessage.notice_message;

            $localStorage.$default({ //route 데이터가 비어있는 경우
                firstappCheck : true
            });

            if($localStorage.firstappCheck === true) { //앱을 처음 설치한 사용자라면 튜토리얼 표시
                var modalInstance = $modal.open({
                    templateUrl: 'views/modals/select_region.html',
                    controller: 'region_modalCtrl',
                    size: 'sm'
                });

                modalInstance.result.then(function (item) {

                });
            } else {

            }
        }]);