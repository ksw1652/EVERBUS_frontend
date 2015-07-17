angular.module('globus.controller').
    controller('region_modalCtrl',[
        '$scope',
        '$modalInstance',
        '$localStorage',
        '$http',
        '$window',
        function ($scope, $modalInstance, $localStorage, $http, $window) {

            //체크된 지역들의 영문명 리스트를 전부 가져와 localstorage에 저장함.
            //$localStorage.변수명   -->   읽을때
            //$localStorage.$default()  -->     값 할당
            if($localStorage.region_checked_list == undefined){ // localstorage 내에 region_checked_list 배열이 없으면
                //초기값 region.json 파일을 읽어 $localStorage에 저장.
                $http.get('/data/region.json')
                    .success(function (data) { //success콜백 함수에서 얻은 data 는 밖에서의 참조가 불가능! 따라서 modalInstance를 이 안에서 만들어 주어아햠.
                        $localStorage.region_checked_list = data;
                        $scope.all_division = $localStorage.region_checked_list;
                    })
                    .error(function (error) {
                        console.log(error);
                    });

            } else {
                $scope.all_division = $localStorage.region_checked_list;
            }

            //"수도권" 아래의 체크박스들 "전체 선택" or "전체 선택 해제"
            $scope.division_clicked = function(getIndex){
                if($localStorage.region_checked_list[getIndex].admin_checked == true){
                    for(var i in $localStorage.region_checked_list[getIndex].data){
                        $localStorage.region_checked_list[getIndex].data[i].checked = true;
                    }
                } else if($localStorage.region_checked_list[getIndex].admin_checked == false){
                    for(var i in $localStorage.region_checked_list[getIndex].data){
                        $localStorage.region_checked_list[getIndex].data[i].checked = false;
                    }
                }
            }

            $scope.item_parent_check = function(getDivision, parentIndex){

                if(getDivision.admin_checked == false){
                    var cnt=0;

                    for(var i in getDivision.data){
                        if(getDivision.data[i].checked == true) {
                            cnt++;
                        }
                    }
                    if(cnt == getDivision.data.length){
                        //한개만 선택하면 "수도권"을 다 선택하는 상태
                        $localStorage.region_checked_list[parentIndex].admin_checked = true;
                    }
                } else {
                    getDivision.admin_checked = false;
                }


            }

            $scope.selectAll = function(){
                for(var i in $localStorage.region_checked_list) {
                    $localStorage.region_checked_list[i].admin_checked = true;
                    for(var j in $localStorage.region_checked_list[i].data){
                        $localStorage.region_checked_list[i].data[j].checked = true;
                    }
                }
            }

            $scope.reset = function() {
                for(var i in $localStorage.region_checked_list) {
                    $localStorage.region_checked_list[i].admin_checked = false;
                    for(var j in $localStorage.region_checked_list[i].data){
                        $localStorage.region_checked_list[i].data[j].checked = false;
                    }
                }
            }

            $scope.ok = function () {
                $localStorage.firstappCheck = false;

                var cnt=0;
                for(var i in $localStorage.region_checked_list) {
                    for(var j in $localStorage.region_checked_list[i].data){
                        if ($localStorage.region_checked_list[i].data[j].checked == true) {
                            cnt++;
                        }
                    }
                }

                if(cnt == 0){
                    $window.alert("지역을 선택해 주세요");
                } else {
                    $modalInstance.close();
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
    }]);