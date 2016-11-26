
var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

var webapp = angular.module('webapp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngProgress',
    'LocalStorageModule'
    ]);
webapp.filter('escape', function() {
    return function(input) {
        if(input) {
            return window.encodeURIComponent(input); 
        }
        return "";
    }
});

webapp.config([
    '$routeProvider',
    '$locationProvider',
    '$mdThemingProvider',
    '$mdIconProvider',
    'localStorageServiceProvider',
    function($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider, localStorageServiceProvider, $location) {

        $routeProvider.when('/', {
            templateUrl: "../recipe-planner/views/homepage.html",
            controller: "HomeController"
        }).when('/recipes', {
            templateUrl: '../recipe-planner/views/recipes.html',
            controller: 'RecipeController'
        }).when('/recipes/:id', {
            templateUrl: '../recipe-planner/views/recipeDetails.html',
            controller: 'RecipeDetailsController'
        }).otherwise({
            redirectTo: "/"
        });

        $locationProvider.html5Mode(false);

        $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('green')
        .warnPalette('deep-orange');

        localStorageServiceProvider.setPrefix('webapp');
    }
    ]);
