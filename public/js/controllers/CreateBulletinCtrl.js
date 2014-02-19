var CreateBulletinCtrl = function($scope, $http, $location) {
  $scope.itemName = '';
  $scope.quantity = null;
  $scope.unit = null;
  $scope.expirationDate = '';
  $scope.expirationTime = '';
  $scope.message = '';
  $scope.type = 'request';

  $scope.postBulletin = function() {
    var data = {
      itemName: $scope.itemName,
      quantity: $scope.quantity,
      unit: $scope.unit,
      expiration: {
        date: $scope.expirationDate,
        time: $scope.expirationTime
      },
      message: $scope.message,
      type: $scope.type
    };
    $http.post('/bulletins', data).success(function(data) {
      if (data.success) {
        $location.path('/');
      }
    });
  };
};

CreateBulletinCtrl.$inject = ['$scope', '$http', '$location'];