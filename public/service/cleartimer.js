/**
 * Created by airnold on 15. 1. 20..
 */
/**
 * Created by airnold on 14. 11. 14..
 */
angular.module('globus.service')
    .factory('clearTimer',[function(){
        var timer = undefined;

        return {
            set_timer : function(timerObj){
                timer = timerObj;
            },
            get_alltimer : function(){
                return timer;
            }
        }
    }]);




