(function() {
    webapp.directive('wuHeader', function() {
        return {
            restrict: 'AE',
            templateUrl: 'views/directives/wuHeader.html',
            controller: [
                '$scope',
                '$rootScope',
                '$location',
                function($scope, $rootScope, $location) {

                    $scope.toggleSidenav = function() {
                        $rootScope.$broadcast('toggleSidenav');
                    };

                    
                }
            ]
        };
    });
})();
