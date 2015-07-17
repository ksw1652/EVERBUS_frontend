/**
 * Created by kimsungwoo on 15. 6. 22..
 */
angular.module('globus.service')
    .factory('pageAnimateFac',[function(){
        var animate_param = "";
        return {
            set_animateParam : function(param){
                animate_param = param;
            },
            get_animateParam : function(){
                return animate_param;
            }
        }
    }]);
