var MessageCtrl = function($scope, $http, $routeParams, $location, $window) {
  $scope.user = [];
  $scope.requests = [];
  $scope.offers = [];
  // Currently (02/26/2014), a bulletin is never marked as resolved. If this is added, we should support that here
  $scope.bulletinsOpen = [];
  $scope.bulletinsExpired = [];

  $http.get('/profile/me').success(function(data) {
    $scope.user = data;
    var baseUrl = '/messages?user_id=' + $scope.user.id;
    // Get requests
    $http.get(baseUrl + "&offer=0").success(function(data) { 
      // HACK: Map user_id to user object. This is needed since we get back two separate lists: history objects and user objects. The user object is possibly shorter if multiple histories from the same user.
      var user_map = {};
      _.each(data.users, function(elem, index) {
        user_map[elem.id] = elem;  
      }); 
      console.log('requests user map', user_map);
    	_.each(data.histories, function(elem, index) {
		    $scope.requests.push({ 
		    	'user': user_map[elem.offerer_id],
		    	'history': elem
		   	});
		  });
      console.log('requests', $scope.requests);
    });
    // Get offers
    $http.get(baseUrl + "&offer=1").success(function(data) {    	
    	var user_map = {};
      _.each(data.users, function(elem, index) {
        user_map[elem.id] = elem;  
      });
      _.each(data.histories, function(elem, index) {
		    $scope.offers.push({ 
		    	'user': user_map[elem.requester_id],
		    	'history': elem
		   	});
		  });
      console.log('offers', $scope.offers);
    });
    // Get bulletins
    $http.get('/bulletins/me').success(function(bulletins) {
      $scope.bulletinsOpen = _.remove(bulletins, function(bulletin) {
        return bulletin.status === 'open'
      });
      $scope.bulletinsExpired = _.remove(bulletins, function(bulletin) {
        return bulletin.status === 'expired'
      });
    });    
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