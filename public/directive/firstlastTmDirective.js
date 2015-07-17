/**
 * Created by kimsungwoo on 15. 7. 13..
 * directive for first-time and last-time in routedetail
 */
angular.module('globus.directive')
    .directive('firstlastTm',function() {
        return {
            restrict: 'E',
            scope: {
                timeObject: '=timeObject'

            },
            template: '<div class="col-xs-6">{{ststopfirst}}</div>' +
                        '<div class="col-xs-6">{{edstopfirst}}</div>'+
                        '<div class="col-xs-6">{{ststoplast}}</div>'+
                        '<div class="col-xs-6">{{edstoplast}}</div>',

            link: function (scope, element, attributes, controller) {
                var date = new Date();

                if(date.getDay() == 0) {// 일요일
                    if(scope.timeObject.sunstcon == 1){ //기점 첫차 막차
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.sunststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.sunststoplasttm;
                    } else if(scope.timeObject.satstcon == 1){
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.satststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.satststoplasttm;
                    } else if(scope.timeObject.daystcon == 1){
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.dayststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.dayststoplasttm;
                    }

                    if(scope.timeObject.sunedcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.sunedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.sunedstopfirsttm;
                    } else if(scope.timeObject.satstcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.satedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.satedstoplasttm;
                    } else if(scope.timeObject.daystcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.dayedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.dayedstoplasttm;
                    }

                } else if(date.getDay() == 6) { //토요일
                    if(scope.timeObject.satstcon == 1){ //기점 첫차 막차
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.satststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.satststoplasttm;

                    } else if(scope.timeObject.sunstcon == 1){
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.sunststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.sunststoplasttm;
                    } else if(scope.timeObject.daystcon == 1){
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.dayststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.dayststoplasttm;
                    }

                    if(scope.timeObject.satedcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.satedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.satedstoplasttm;
                    } else if(scope.timeObject.sunstcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.sunedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.sunedstopfirsttm;
                    } else if(scope.timeObject.daystcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.dayedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.dayedstoplasttm;
                    }

                } else { //평일
                    if(scope.timeObject.daystcon == 1){ //기점 첫차 막차
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.dayststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.dayststoplasttm;
                    } else if(scope.timeObject.sunstcon == 1){
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.sunststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.sunststoplasttm;
                    } else if(scope.timeObject.satstcon == 1){
                        scope.ststopfirst = "기점 첫차 - " + scope.timeObject.satststopfirsttm;
                        scope.ststoplast = "기점 막차 - " + scope.timeObject.satststoplasttm;
                    }

                    if(scope.timeObject.dayedcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.dayedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.dayedstoplasttm;
                    } else if(scope.timeObject.sunedcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.sunedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.sunedstopfirsttm;
                    } else if(scope.timeObject.satedcon == 1){
                        scope.edstopfirst = "종점 첫차 - " + scope.timeObject.satedstopfirsttm;
                        scope.edstoplast = "종점 막차 - " + scope.timeObject.satedstoplasttm;
                    }
                }
            }
        }
    });