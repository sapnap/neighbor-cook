var InitInventoryCtrl = function($scope, $http, $location) {
  $scope.user = [];
  $scope.gpsStatus = 'Provide GPS';
  $scope.gpsDisable = false;
  $scope.home = false;
  $scope.userField = {
    email: '',
    location: '94305',
    gps: ''
  };
  $scope.defaultItems = [
  	{ item: 'Salt', id: 208 },
    { item: 'Milk', id: 109 },
    { item: 'Eggs', id: 155 },
    { item: 'Butter', id: 110 },
    { item: 'Pepper', id: 209 },
    { item: 'Flour', id: 127 },
    { item: 'Brown rice', id: 137 }
  ];
  $scope.selectedItems = {
    208: true,
    109: true,
    155: true,
    110: true,
    209: true,
    127: true,
    137: true
  };

  $http.get('/profile/me').success(function(data) {
  	$scope.user = data;
  });

  $scope.initUser = function() {
    if (!$scope.initForm.$valid) {
      return;
    }
    if ($scope.hasAutoLocation) {
      $scope.userField.gps = $scope.userField.location;
    }
    var payload = {
      'user': $scope.userField,
      'inventory': $scope.selectedItems
    };
  	$http.put('/inventory', payload).success(function() {
      $location.path('/profile/' + $scope.user.id);
	  }).error(function(err) {
      console.log(err);
    });
  };
  
  $scope.getLocation = function() {
    if (navigator.geolocation) {
      $scope.gpsStatus = "Fetching GPS...";
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  var showPosition = function(position) {
    // TODO: do reverse lookup of lat/long to zipcode so this is human understandable
    $scope.userField.gps = position.coords.latitude + "," + position.coords.longitude;
    console.log($scope.userField.gps);
    $scope.gpsStatus = "Found GPS, thanks!";
    $scope.gpsDisable = true;
    $scope.$apply();
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