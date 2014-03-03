var HistoryCtrl = function($scope, $http, $routeParams, $location, $window) {
  $scope.user = [];

  $scope.requestsOther = [];
  $scope.requestsInit = [];
  $scope.offersInit = [];
  $scope.offersOther = [];
  // Currently (02/26/2014), a bulletin is never marked as resolved. If this is added, we should support that here
  $scope.bulletinsOpen = [];
  $scope.bulletinsExpired = [];

  $http.get('/profile/me').success(function(data) {
    $scope.user = data;
    $http.get('/messages?user_id=' + $scope.user.id).success(function(data) {
      console.log("made request to messages", data);
      $scope.requestsOther = data.requestsOther;
      $scope.requestsInit = data.requestsInit;

      $scope.offersOther = data.offersOther;
      $scope.offersInit = data.offersInit;
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

HistoryCtrl.$inject = ['$scope', '$http', '$routeParams', '$location', '$window'];