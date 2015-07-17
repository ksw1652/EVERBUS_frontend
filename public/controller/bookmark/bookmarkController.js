/**
 * Created by kimsungwoo on 15. 1. 14..
 */

angular.module('globus.controller')
    .controller('bookmarkController',[
        '$scope',
        '$localStorage',
        '$location',
        'ngToast',
        '$navigate',
        "$modal",
        'usSpinnerService',
        'routeItemFac',
        'stationItemFac',
        'pageAnimateFac',
        function($scope, $localStorage, $location, ngToast, $navigate, $modal, usSpinnerService, routeItemFac, stationItemFac, pageAnimateFac) {

            $scope.animate_value = pageAnimateFac.get_animateParam();

            var storage_bookmarkList = $localStorage.bookmarkList;

            $scope.route_bookmark_value = false;
            $scope.station_bookmark_value = false;

            if(storage_bookmarkList == undefined || storage_bookmarkList.length == 0) {
                $scope.bookmarkMessage = "즐겨찾기가 존재하지 않습니다. 자주 사용하는 노선과 정류소를 추가해 주세요";
                $scope.alert_div = true;
            } else {
                $scope.alert_div = false;
                $scope.getBookmarkList = storage_bookmarkList;
            }

            $scope.check_show = function(index){
                if($scope.getBookmarkList[index].type == "route"){ //type으로 노선, 정류소 즐겨찾기 구분
                    return true;

                } else {
                    return false;

                }
            }

            //즐겨찾기 삭제 모달 open
            $scope.open = function (index) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/modals/remove_bookmarkItemModal.html',
                    controller: 'removeModalCtrl',
                    resolve :{
                        selected_index : function(){
                            return index
                        }
                    }
                });

                modalInstance.result.then(function (agreeDeleteItem_index) {
                    $localStorage.bookmarkList.splice(agreeDeleteItem_index, 1);
                    $scope.getBookmarkList= $localStorage.bookmarkList;
                    if($localStorage.bookmarkList.length == 0) {
                        $scope.bookmarkMessage = "즐겨찾기가 존재하지 않습니다. 자주 사용하는 노선과 정류소를 추가해 주세요";
                        $scope.alert_div = true;
                    }
                });
            };

            $scope.goDetailPage = function(item){
                console.log(item);
                usSpinnerService.spin('bookmark_spinner');

                if(item.type == "route"){
                    routeItemFac.set_routeItem(item);
                    $navigate.go('/routesearch/routedetail');
                } else if(item.type == "station"){
                    stationItemFac.set_stationItem(item);
                    $navigate.go('/stationsearch/stationdetail');

                }
            };
        }]);
