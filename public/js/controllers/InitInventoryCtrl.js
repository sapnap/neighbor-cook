var InitInventoryCtrl = function($scope, $http, $location) {
  $scope.user = [];
  $scope.userField = {
    'email': '',
    'location': 'Stanford, CA'
  };
  $scope.defaultItems = [
  	{'item': 'Salt', 'id': 208}, 
    {'item': 'Milk', 'id': 109},
    {'item': 'Eggs', 'id': 155},
    {'item': 'Butter', 'id': 110},
    {'item': 'Pepper', 'id': 209},
    {'item': 'Flour', 'id': 127},
    {'item': 'Brown rice', 'id': 137}
  ];
  $scope.selectedItems = {
    208: true,
    109: true,
    155: true,
    110: true,
    209: true,
    127: true,
    137: true,
  };

  $http.get('/profile/me').success(function(data) {
  	$scope.user = data;
  	console.log(data);
  });

  $scope.initUser = function() {
    if (!$scope.initForm.$valid) {
      console.log('cannot submit! hopefully you can see that from the error messages');
      return;
    }
  	console.log('clicked the button');
    console.log($scope.selectedItems);
    console.log($scope.userField);
    payload = {
      'user': $scope.userField,
      'inventory': $scope.selectedItems
    }
  	$http.put('/inventory', payload).success(function(data) {
	  	console.log("submitting with payload data", payload);
      console.log('/profile/' + $scope.user.id);
      $location.path('/profile/' + $scope.user.id);
	  }).error(function(err) {
      console.log(err);
    });
  };
  
};

InitInventoryCtrl.$inject = ['$scope', '$http', '$location'];