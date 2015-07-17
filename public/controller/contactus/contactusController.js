/**
 * Created by kimsungwoo on 15. 2. 3..
 */
angular.module('globus.controller')
    .controller('contactusController',[
        '$scope',
        '$modal',
        '$mailServiceFactory',
        'ngToast',
        '$location',
        'contactus_data',
        '$navigate',
        'pageAnimateFac',
        function($scope, $modal, $mailServiceFactory, ngToast, $location, contactus_data, $navigate, pageAnimateFac) {

            $scope.animate_value = pageAnimateFac.get_animateParam();

            $scope.open = function (size) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/modals/sendEmailModal.html',
                    controller: 'sendEmailController',
                    size: size
                });

                modalInstance.result.then(function (faq_data) {
                    ///Toast추가 할것.
                    $mailServiceFactory.sendmail(faq_data);
                    var msg = ngToast.create({
                        content: '메일이 접수되었습니다.',
                        className: 'info',
                        dismissButton : true
                    });
                });
            };

            $scope.redo_select_region = function(){
                var modalInstance = $modal.open({
                    templateUrl: 'views/modals/select_region.html',
                    controller: 'region_modalCtrl',
                    size : 'sm'
                });
            }

            $scope.gotoDetail = function(param, title){
                contactus_data.set_contactus_data(param, title);
                $navigate.go('/contactus/contactusdetail', 'modal');

            }
        }]);