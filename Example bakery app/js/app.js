var module = angular.module('myApp', ['ngRoute'])
    .controller('controllerOne', function($scope) {
        $scope.message = 'Hello world from Controller One!';
    })
    .controller('controllerTwo', function($scope) {
        $scope.message = 'Hello world from Controller Two!';
    })
    .controller('controllerThree', function($scope) {
        $scope.message = 'Hello world from Controller Three!';
    })
    .controller('defaultController', function($scope) {
        $scope.message = 'Hello world from the default controller';
    })
    .config(($routeProvider) => {
        $routeProvider
        .when('/one', {
            templateUrl: '../html/view-one.html',
            controller: 'controllerOne',
            controllerAs: 'ctrlOne'
        })
        .when('/two', {
            templateUrl: '../html/view-two.html',
            controller: 'controllerTwo',
            controllerAs: 'ctrlTwo'
        })
        .when('/three', {
            templateUrl: '../html/view-three.html',
            controller: 'controllerThree',
            controllerAs: 'ctrlThree'
        })
        .when('/default', {
            templateUrl: '../html/default.html',
            controller: 'defaultController',
            controllerAs: 'defaultController'
        })
        //Redirect to her if no other routes match (a default)
        .otherwise({
            redirectTo: '/default'
        });
    });