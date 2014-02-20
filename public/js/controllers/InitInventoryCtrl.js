var InitInventoryCtrl = function($scope, $http, $location) {
  $scope.hasAutoLocation = false;
  $scope.user = [];
  $scope.userField = {
    'email': '',
    'location': '94305',
    'gps': ''
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
    if ($scope.hasAutoLocation) {
      $scope.userField.gps = $scope.userField.location;
    }
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
  
  $scope.getLocation = function() {
    if (navigator.geolocation) {
      console.log('we have geolocation!');
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  var showPosition = function(position) {
    // TODO: do reverse lookup of lat/long to zipcode so this is human understandable
    // WHY DOES this need TWO button clicks??
    // Communicate to user better here
    $scope.userField.location = position.coords.latitude + "," + position.coords.longitude;
    $scope.hasAutoLocation = true;
    console.log($scope.userField.location);
  };

  var handleError = function(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
      }
  };
};

InitInventoryCtrl.$inject = ['$scope', '$http', '$location'];