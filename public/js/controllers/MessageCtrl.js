var MessageCtrl = function($scope, $http, $routeParams, $location, $window) {
  $scope.user = [];
  $scope.requests = [];
  $scope.offers = [];
  $scope.bulletins = [];

  $http.get('/profile/me').success(function(data) {
    $scope.user = data;
    var baseUrl = '/messages?user_id=' + $scope.user.id;
    // Get requests
    $http.get(baseUrl + "&offer=0").success(function(data) { 
    	_.each(data.users, function(elem, index) {
		    $scope.requests.push({ 
		    	'user': elem,
		    	'history': data.histories[index]
		   	});
		  });
		  console.log("requests", $scope.requests);
    });
    // Get offers
    $http.get(baseUrl + "&offer=1").success(function(data) {    	
    	_.each(data.users, function(elem, index) {
		    $scope.offers.push({ 
		    	'user': elem,
		    	'history': data.histories[index]
		   	});
		  });
		  console.log("offers", $scope.offers);
    });
    // Get bulletins
    $http.get('/bulletins/me').success(function(data) {
      console.log(data);
      $scope.bulletins = data;
    });
    console.log("bulletins", $scope.bulletins);
  });

  $scope.deleteBulletin = function(bulletinID) {
    $http.delete('/bulletins/' + bulletinID).success(function() {
      _.remove($scope.bulletins, function(bulletin) {
        return bulletin.id === bulletinID;
      })
    });
  };

  $scope.editBulletin = function(bulletinID) {
    $location.path('/bulletins/' + bulletinID + '/edit');
  };
};

MessageCtrl.$inject = ['$scope', '$http', '$routeParams', '$location', '$window'];