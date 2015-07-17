/**
 * Created by kimsungwoo on 15. 2. 24..
 */
angular.module('globus.controller')
    .controller('contactusdetailController',[
        '$scope',
        'contactus_data',
        '$navigate',
        '$modal',
        '$localStorage',
        '$anchorScroll',
        function($scope, contactus_data, $navigate, $modal, $localStorage, $anchorScroll) {

            $anchorScroll();

            $scope.animate_value = "wow bounceInUp";

            $scope.aboutappCheck = false;
            $scope.versionCheck = false;
            $scope.appdatadeleteCheck = false;
            $scope.locationCheck = false;
            $scope.infosourceCheck = false;

            $scope.back_toContactus = function() {
                $navigate.back();
            }

            var getData = contactus_data.get_contactus_data();
            $scope.contactusdetail_title = getData.title;

            if(getData.param == "aboutapp") {
                $scope.aboutappCheck = true;
                $scope.versionCheck = false;
                $scope.appdatadeleteCheck = false;
                $scope.locationCheck = false;
                $scope.infosourceCheck = false;
            } else if(getData.param == "version"){
                $scope.versionCheck = true;
                $scope.appdatadeleteCheck = false;
                $scope.aboutappCheck = false;
                $scope.locationCheck = false;
                $scope.infosourceCheck = false;
            } else if(getData.param == "location"){
                $scope.locationCheck = true;
                $scope.appdatadeleteCheck = false;
                $scope.aboutappCheck = false;
                $scope.versionCheck = false;
                $scope.infosourceCheck = false;
            } else if(getData.param == "appdata") {
                $scope.appdatadeleteCheck = true;
                $scope.locationCheck = false;
                $scope.aboutappCheck = false;
                $scope.versionCheck = false;
                $scope.infosourceCheck = false;
            }
            else {
                $scope.infosourceCheck = true;
                $scope.aboutappCheck = false;
                $scope.appdatadeleteCheck = false;
                $scope.versionCheck = false;
                $scope.locationCheck = false;
            }

            $scope.check_all = function(){
                $scope.bookmark_checkbox = true;
                $scope.recentroute_checkbox = true;
                $scope.recentstation_checkbox = true;
            }
            $scope.check_clear = function(){
                $scope.bookmark_checkbox = false;
                $scope.recentroute_checkbox = false;
                $scope.recentstation_checkbox = false;
            }
            $scope.delete_checked = function(value1, value2, value3){
                var modalInstance = $modal.open({
                    templateUrl: 'views/modals/remove_appdata.html',
                    controller: 'removeAppdataCtrl',
                    resolve :{
                        get_checkboxValue : function(){
                            var temp=[];
                            temp.push(value1);
                            temp.push(value2);
                            temp.push(value3);
                            return temp;
                        }
                    }
                });

                modalInstance.result.then(function (get_checkboxValue) {
                    if(get_checkboxValue[0] == true) {
                        delete $localStorage.bookmarkList;
                    }

                    if(get_checkboxValue[1]== true) {
                        delete $localStorage.recently_search_routeList;
                    }

                    if(get_checkboxValue[2] == true) {
                        delete $localStorage.recently_search_stationList;
                    }

                    $navigate.back();
                });
            };

        }]);
