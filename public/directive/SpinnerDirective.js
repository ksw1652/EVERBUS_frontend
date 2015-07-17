angular.module('globus.directive')
    .directive('spinnerDirective',function($timeout){
        return {
            restrict: 'E',
            template: '<i class="fa fa-spinner fa-pulse"></i>',
            scope: {
                show: '=',
                delay: '@'
            },
            link: function(scope, elem, attrs) {
                var showTimer;

                console.log(scope.show);
                console.log(scope.delay);
                //This is where all the magic happens!
                // Whenever the scope variable updates we simply
                // show if it evaluates to 'true' and hide if 'false'
                scope.$watch('show', function(newVal){
                    console.log(newVal);
                    newVal ? showSpinner() : hideSpinner();
                });

                function showSpinner() {
                    //If showing is already in progress just wait
                    if (showTimer) return;

                    //Set up a timeout based on our configured delay to show
                    // the element (our spinner)
                    showTimer = $timeout(showElement.bind(this, true), getDelay());
                }

                function hideSpinner() {
                    //This is important. If the timer is in progress
                    // we need to cancel it to ensure everything stays
                    // in sync.
                    if (showTimer) {
                        $timeout.cancel(showTimer);
                    }

                    showTimer = null;

                    showElement(false);
                }

                function showElement(show) {
                    show ? elem.css({display:''}) : elem.css({display:'none'});
                }

                function getDelay() {
                    var delay = parseInt(scope.delay);
                    console.log(delay);
                    console.log(isNaN(delay));
                    console.log(typeof(delay));

                    return delay;
                }
            }
        };
    });