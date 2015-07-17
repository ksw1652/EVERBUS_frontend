/**
 * Created by kimsungwoo on 15. 2. 24..
 */
angular.module('globus.service')
    .factory('contactus_data',[function(){
        var data = undefined;
        return {
            set_contactus_data : function(getParam, getTitle){
                data = {
                    param : getParam,
                    title : getTitle
                };
            },
            get_contactus_data : function(){
                return data;
            }
        }
    }]);
