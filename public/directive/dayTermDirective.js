/**
 * Created by kimsungwoo on 15. 7. 13..
 * directive for bus term in routedetail
 */
angular.module('globus.directive')
    .directive('dayTerm',function() {
        return {
            restrict: 'E',
            scope: {
                termObject: '=termObject'

            },
            template: '<div class="col-xs-12">{{term}}</div>',

            link: function (scope, element, attributes, controller) {
                var date = new Date();

                if(scope.termObject != null){
                    if(date.getDay() == 0) {// 일요일
                        if(scope.termObject.sunterm != null){
                            scope.term = "배차 간격 - " + scope.termObject.sunterm;
                        } else if(scope.termObject.dayterm != null ) {
                            scope.term = "배차 간격 - " + scope.termObject.dayterm;
                        } else if(scope.termObject.satterm != null ){
                            scope.term = "배차 간격 - " + scope.termObject.satterm;
                        }
                    } else if(date.getDay() == 6) { //토요일
                        if(scope.termObject.satterm != null){
                            scope.term = "배차 간격 - " + scope.termObject.satterm;
                        } else if(scope.termObject.dayterm != null ) {
                            scope.term = "배차 간격 - " + scope.termObject.dayterm;
                        } else if(scope.termObject.sunterm != null ){
                            scope.term = "배차 간격 - " + scope.termObject.sunterm;
                        }
                    } else { //평일
                        if(scope.termObject.dayterm != null){
                            scope.term = "배차 간격 - " + scope.termObject.dayterm;
                        } else if(scope.termObject.satterm != null ) {
                            scope.term = "배차 간격 - " + scope.termObject.satterm;
                        } else if(scope.termObject.sunterm != null ){
                            scope.term = "배차 간격 - " + scope.termObject.sunterm;
                        }
                    }
                }

            }
        }
    });