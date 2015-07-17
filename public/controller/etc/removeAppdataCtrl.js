/**
 * Created by kimsungwoo on 15. 5. 20..
 */
angular.module('globus.controller').
    controller('removeAppdataCtrl',['$scope', '$modalInstance', 'get_checkboxValue',
        function ($scope, $modalInstance, get_checkboxValue) {

            $scope.ok = function () {
                $modalInstance.close(get_checkboxValue);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
