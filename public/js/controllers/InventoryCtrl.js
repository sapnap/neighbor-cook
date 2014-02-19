var InventoryCtrl = function($scope, $http) {
  $scope.errorNotLoggedIn = false;
  $scope.inventory = [];
  $scope.itemName = '';

  $http.get('/inventory').success(function(data) {
    $scope.inventory = data.inventory;
  });

  $scope.addItem = function() {
    var data = { itemName: $scope.itemName };
    $http.post('/inventory', data).success(function(data) {
      // TODO animation
      $scope.inventory.unshift(data.item);
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
};

InventoryCtrl.$inject = ['$scope', '$http'];