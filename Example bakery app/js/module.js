var exampleApp = angular.module('exampleApp', ['ngRoute', 'ngAnimate']);

                                            //This part was done to protect variables and it's also a best practice.
                                            //It's also another way to declare and use dependencies
exampleApp.controller('exampleController', ['$scope', '$http', function($scope, $http) {
    $scope.removeNinja = (ninja) => {        
        $scope.ninjas.splice($scope.ninjas.indexOf(ninja), 1);
    }

    $scope.addNinja = () => {
        $scope.ninjas.push({
            name: $scope.newNinja.name,
            belt: $scope.newNinja.belt,
            rate: parseInt($scope.newNinja.rate),
            available: true
        });

        $scope.newNinja.name = '';
        $scope.newNinja.belt = '';
        $scope.newNinja.rate = '';        
    }

    $scope.message = "This was sent from the example controller";    

    $http({
        method: 'GET',
        url: '../data/ninjas.json'
    }).then(function successCallback(response){
        data = response.data;
        $scope.ninjas = data;
    }, function errorCallback(error){
        console.log('Error while fetching data', error);
    });    

    $scope.removeAll = () => {
        $scope.ninjas = [];    }
}]);

exampleApp.controller('contactController', ['$scope', '$location', function($scope, $location) {
    $scope.sendMessage = () => {
        $location.path('/contact-success');
    }
}]);

exampleApp.directive('randomNinja', [function(){
    return {
        restrict: 'E',
        //Creates a separate, isolate scope from the main scope
        scope: {
            //Takes the ninjas array that is being passed from the controller and binds it into a ninjas array in the local scope
            ninjas: '=',
            title: '='
        }, 
        templateUrl: '../html/random.html',
        transclude: true,
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);

//The config method doesn't need a name like the controller, only the dependencies
exampleApp.config(['$routeProvider', function($routeProvider){
    
    $routeProvider
        .when('/home', {
            templateUrl: '../html/home.html',
            controller: 'exampleController'
        })
        .when('/contact', {
            templateUrl: '../html/contact.html',
            controller: 'contactController'
        })
        .when('/contact-success', {
            templateUrl: '../html/contact-success.html',
            controller: 'contactController'
        })
        .when('/directory', {
            templateUrl: '../html/directory.html',
            controller: 'exampleController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

//Services can be used to share data between controllers
exampleApp.factory('dataService', function(){
    let dataObject = {};
    let service = {
        get data() {
            return dataObject;
        },
        set data(value){
            dataObject = value || {};
        }
    };
    return service;
});

/*
    A service is a constructor function that is called at runtime with new (like when you create an instance),
    just like with plain JS, but in this case Angular is calling new behind the scenes.
*/
function StudentDetailsService($http) {
    this.getStudentDetails = function getStudentDetails() {
        return $http.get('/details');
    }
}

exampleApp.service('StudentDetailsService', StudentDetailsService);

exampleApp.controller('controllerOne', ['$scope', function($scope){
    //Creates a local reference to the dataService
    this.dataService = dataService;
    //This will automatically update with any changes to the shared data object
    this.objectFromControllerOne = this.dataService.data;
}]);