/**
 * Created by kimsungwoo on 15. 4. 28..
 */
angular.module('globus.directive')
    .directive('ngTap', function() {
        var isTouchDevice = !!("ontouchstart" in window);
        return function(scope, elm, attrs) {
            if (isTouchDevice) {
                var tapping = false;
                elm.bind('touchstart', function() { tapping = true; });
                elm.bind('touchmove', function() { tapping = false; });
                elm.bind('touchend', function() {
                    tapping && scope.$apply(attrs.ngTap);
                });
            } else {
                elm.bind('click', function() {
                    scope.$apply(attrs.ngTap);
                });
            }
        };
    });
