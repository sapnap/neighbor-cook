var dependencies = [
  'ngRoute',
  'mgcrea.ngStrap',
  'ncook.filters',
  'ncook.directives',
  'ncook.services'
];

angular.module('ncook', dependencies).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/help', {
      templateUrl: '/partials/help.html',
      controller: 'HelpCtrl'
    }).
    when('/tos', {
      templateUrl: '/partials/tos.html'
    }).
    when('/help/getStarted', {
      templateUrl: '/partials/help-getStarted.html'
    }).
    when('/search', {
      templateUrl: '/partials/search.html',
      controller: 'SearchCtrl'
    }).
    when('/profile/edit', {
      templateUrl: 'partials/profile-edit.html',
      controller: 'EditProfileCtrl'
    }).
    when('/profile/:userID', {
      templateUrl: '/partials/profile.html',
      controller: 'ProfileCtrl'
    }).
    when('/messages/compose/:recipientID', {
      templateUrl: '/partials/messages-compose.html',
      controller: 'ComposeMessageCtrl'
    }).
    when('/messages', {
      templateUrl: '/partials/messages.html',
      controller: 'MessageCtrl'
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
      templateUrl: 'partials/bulletins-build.html',
      controller: 'CreateBulletinCtrl'
    }).
    when('/bulletins/:bulletinID/edit', {
      templateUrl: 'partials/bulletins-build.html',
      controller: 'EditBulletinCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }]);
