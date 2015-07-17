/**
 * Created by kimsungwoo on 15. 5. 18..
 */
angular.module('globus.filter')
    .filter('$search_reverse_filter', function() {
    return function(items) {
        if(items != undefined){
            return items.slice().reverse();
        }


    };
});
