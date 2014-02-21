var MessageCtrl = function($scope, $http, $routeParams, $location, $window) {
  $scope.user = [];
  $scope.requests = [];
  $scope.offers = [];

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
  });
};

MessageCtrl.$inject = ['$scope', '$http', '$routeParams', '$location', '$window'];