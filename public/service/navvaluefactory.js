/**
 * Created by kimsungwoo on 15. 3. 15..
 */
angular.module('globus.service')
    .service('nav_value',['$rootScope', function($rootScope){
        var bookmark = undefined,
            routesearch = undefined,
            stationsearch = undefined,
            placesearch = undefined;

        return {
            set_allValue : function(v1, v2, v3, v4){
                bookmark = v1;
                routesearch = v2;
                stationsearch = v3;
                placesearch = v4;

                $rootScope.$broadcast('value_changed', bookmark, routesearch, stationsearch, placesearch);
            }
        }
    }]);