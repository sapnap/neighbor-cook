var InitInventoryCtrl = function($scope, $http, $q, $location, UserService) {
  $scope.gpsStatus = 'Provide GPS';
  $scope.gpsDisable = false;
  $scope.home = false;
  $scope.foundGPS = '';
  $scope.foundLocation = '';

  $scope.defaultItems = [
  	{ item: 'Salt', id: 439 },
    { item: 'Reduced Fat Milk', id: 206 },
    { item: 'Whole Egg', id: 336 },
    { item: 'Unsalted Butter', id: 186 },
    { item: 'Black Pepper', id: 440 },
    { item: 'All-Purpose Flour', id: 253 },
    { item: 'White Rice', id: 266 }
  ];
  $scope.selectedItems = {
    439: true,
    206: true,
    336: true,
    186: true,
    440: true,
    253: true,
    266: true
  };

  UserService.
    getCurrentUser().
    success(function(user) { 
      $scope.user = user; 
      $scope.userField.email = user.email;
    }).
    error(function() { $scope.user = {}; });
  $scope.userField = {
    email: '',
    location: '',
    gps: ''
  };

  $scope.toggleItem = function(itemID) {
    $scope.selectedItems[itemID] = !$scope.selectedItems[itemID];
  };

  $scope.initUser = function() {
    if ($scope.initForm.$invalid) return;

    var itemIDs = [];
    _.each($scope.selectedItems, function(val, key) {
      if (val) itemIDs.push(key);
    });
    $q.all({
      user: $http.put('/profile/me', $scope.userField),
      inventory: $http.put('/inventory', { inventory: itemIDs })
    }).then(function() {
      $location.path('/profile/' + $scope.user.id);
    });
  };

  // TODO create geolocation service
  var getLocation = function() {
    if (navigator.geolocation) {
      $scope.gpsStatus = "Fetching GPS...";
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  $scope.$on('$viewContentLoaded', getLocation);

  var showPosition = function(position) {
    $scope.foundGPS = position.coords.latitude + "," + position.coords.longitude;
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.foundGPS +
        '&sensor=true&result_type=political&key=AIzaSyC68chSmCbBG81PT19hH65G8Ai1jtm-6yE').
      success(function(data) {
        $scope.foundLocation = data.results[0].formatted_address;
      });
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

  $scope.setAutoLocation = function() {
    // $scope.home doesn't change until after this function executes
    if (!$scope.home) {
      $scope.userField.gps = $scope.foundGPS;
      $scope.userField.location = $scope.foundLocation;
    } else {
      $scope.userField.gps = '';
      $scope.userField.location = '';
    }
  }
};

InitInventoryCtrl.$inject = ['$scope', '$http', '$q', '$location', 'UserService'];