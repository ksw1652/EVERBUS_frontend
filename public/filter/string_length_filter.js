/**
 * Created by kimsungwoo on 15. 6. 2..
 */
angular.module('globus.filter')
    .filter('$string_length_filter', function() {
        return function(str) {
            if(str != undefined){
                if(str.length >= 7) {
                    return str.substr(0, 6) + "..";
                }else {
                    return str;
                }
            }

        };
    });
