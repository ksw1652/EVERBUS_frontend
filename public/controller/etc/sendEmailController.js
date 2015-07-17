/**
 * Created by kimsungwoo on 15. 2. 3..
 */
angular.module('globus.controller')
    .controller('sendEmailController',['$scope', '$modalInstance',
        function($scope, $modalInstance) {
            $scope.faq_subject=undefined;
            $scope.faq_contents=undefined;

            $scope.ok = function () {
                var data={};
                data.faq_subject = $scope.faq_subject;
                data.faq_contents = $scope.faq_contents;
                $modalInstance.close(data);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);