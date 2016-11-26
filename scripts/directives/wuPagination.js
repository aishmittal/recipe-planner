(function() {
    webapp.directive('wuPagination', function () {
        return {
            restrict: 'AE',
            templateUrl: '../recipe-planner/views/directives/wuPagination.html',
            scope: {},
            controller: [
                '$scope',
                '$location',
                '$rootScope',
                function($scope, $location, $rootScope) {
                    var listeners = [];
                    $scope.page = {
                        next:0,
                        previous:0,
                        current: 0,
                        total: 0
                    };
                    $scope.count = 0;
                    var setPage = $rootScope.$on('setPage', function(event, data) {
                        $scope.page.current = parseInt(data.page);
                        $scope.page.next = $scope.page.current + 1;
                        $scope.page.previous = $scope.page.current - 1;
                        $scope.page.total = data.totalPages;
                    });
                    listeners.push(setPage);

                    $scope.btnClicked = function(event, step) {
                        event.preventDefault();
                        if(($scope.page.current === 1 && step == -1) || ($scope.page.current === $scope.page.total && step == 1)) {
                            return;
                        }
                            $scope.page.current += step;


                        $location.search('page', $scope.page.current);
                    };

                    $scope.pageDirect = function(val){
                        $scope.count +=val;
                        if((($scope.count > 2 && val > 0) || ($scope.count > 1 && val < 0)) || (($scope.count < -2 && val < 0) || ($scope.count < -1 && val > 0))){
                        $scope.page.next +=val;
                        $scope.page.previous +=val;
                        }
                    }

                    $scope.$on('$destroy', function() {
                        angular.forEach(listeners, function(value, key) {
                            value();
                        });
                    });
                }
            ]
        };
    });
})();
