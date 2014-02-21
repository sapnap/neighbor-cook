var ProfileCtrl = function($scope, $http, $routeParams) {
  $scope.error = '';
  $scope.editable = false;
  $scope.id = 0;
  $scope.name = '';
  $scope.image = 'http://lorempixel.com/64/64/people';
  $scope.location = '';
  $scope.donated = 0;
  $scope.received = 0;
  $scope.inventory = [];

  $http.get('/profile/' + $routeParams.userID).
    success(function(data) {
      $scope.errorNotLoggedIn = data.errorNotLoggedIn;
      $scope.editable = data.editable;
      $scope.id = data.id;
      $scope.name = data.name;
      $scope.image = data.image;
      $scope.location = data.location;
      $scope.donated = data.donated;
      $scope.received = data.received;
      $scope.inventory = data.inventory;
    }).
    error(function(data) {
      // should never get here
      $scope.error = data.error;
    });

  $scope.resetError = function() {
    $scope.error = '';
  };
};

ProfileCtrl.$inject = ['$scope', '$http', '$routeParams'];
