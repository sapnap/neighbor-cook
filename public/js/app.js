var app = angular.module('ncook', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/profile/:id', {
      templateUrl: '/partials/profile.html',
      controller: 'ProfileCtrl'
    }).
    when('/inventory', {
      templateUrl: 'partials/inventory.html',
      controller: 'InventoryCtrl'
    }).
    when('/inventory/initialize', {
      templateUrl: 'partials/inventory-initialize.html',
      controller: 'InitInventoryCtrl'
    }).
    when('/bulletins/create', {
      templateUrl: 'partials/bulletin-create.html',
      controller: 'CreateBulletinCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});

