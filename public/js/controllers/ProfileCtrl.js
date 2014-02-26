var ProfileCtrl = function($scope, $http, $routeParams, $window, TypeaheadService) {
  $scope.error = '';
  $scope.editable = false;
  $scope.inventory = [];
  $scope.profile = {};
  $scope.itemName = '';

  $http.get('/profile/' + $routeParams.userID).
    success(function(data) {
      $scope.editable = data.editable;
      $scope.profile = data.user;
      $scope.profile.name = data.name;
      $scope.inventory = data.user.items;
    }).
    error(function(data) {
      // should never get here
      $scope.error = data.error;
    });

  $scope.resetError = function() {
    $scope.error = '';
  };

  $scope.addItem = function() {
    var data = { itemName: $scope.itemName };
    $http.post('/inventory', data).
      success(function(data) {
        // TODO animation: http://mgcrea.github.io/angular-motion/
        $scope.inventory.unshift(data.item);
      }).
      error(function(data) {
        $scope.error = data.error;
        $scope.itemName = '';
        $window.scrollTo(0, 0);
      });
  };

  $scope.deleteItem = function(id) {
    $http.delete('/inventory/' + id).success(function(data) {
      // TODO animation
      _.remove($scope.inventory, function(item) {
        return item.id == data.itemID;
      })
    });
  };

  $scope.typeahead = TypeaheadService.items;
};

ProfileCtrl.$inject = ['$scope', '$http', '$routeParams', '$window', 'TypeaheadService'];
