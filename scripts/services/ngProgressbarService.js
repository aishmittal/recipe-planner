(function() {
    "use strict";

    webapp.factory("ngProgressBarService", [
        '$rootScope',
        'ngProgressFactory',
        '$timeout',
        function($rootScope, ngProgressFactory, $timeout) {
            var factory = {};

            var settings = {
                color: 'red',
                height: '3px',
            };
            var progressbar, element;

            var init = function() {
                progressbar = ngProgressFactory.createInstance();
                progressbar.setColor(settings.color);
                progressbar.setHeight(settings.height);
                element = document.getElementById("progressBar");
                progressbar.setParent(element);
                element.style.display = 'none';
            };
            init();

            $rootScope.$on('showProgressbar', function(event) {
                element.style.display = 'block';
                progressbar.start();
            });

            $rootScope.$on('endProgressbar', function(event) {
                progressbar.complete();
                $timeout(function() {
                    element.style.display = 'none';
                }, 1000);
            });

            return factory;
        }
    ]);
})();
