/**
 * Created by kimsungwoo on 15. 4. 23..
 */
angular.module('globus.controller').
    controller('removeModalCtrl',['$scope', '$modalInstance', 'selected_index',
        function ($scope, $modalInstance, selected_index) {

            $scope.ok = function () {
                $modalInstance.close(selected_index);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
