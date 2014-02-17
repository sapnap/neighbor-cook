var app = angular.module('home', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: '/partials/home.html', controller: 'HomeController'}).
    otherwise({redirectTo: '/'});
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

var profileApp = angular.module('profile', ['ngRoute']).
	config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/profile/:id', {templateUrl: '/partials/profile.html', controller: 'ProfileController'}).
    otherwise({redirectTo: '/'});
}]);

