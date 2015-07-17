angular
    .module('globus')
    .config(['ngToastProvider', function(ngToast) {
        ngToast.configure({
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            maxNumber: 1
        });
    }]);
