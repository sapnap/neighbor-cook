var InventoryCtrl = function($scope, $http, TypeaheadService) {
  $scope.error = '';
  $scope.inventory = [];
  $scope.itemName = '';

  $http.get('/inventory').success(function(data) {
    $scope.inventory = data.inventory;
  });

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

  $scope.resetError = function() {
    $scope.error = '';
  };

  $scope.typeahead = TypeaheadService.items;
};

InventoryCtrl.$inject = ['$scope', '$http', 'TypeaheadService'];