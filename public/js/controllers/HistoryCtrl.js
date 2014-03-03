var HistoryCtrl = function($scope, $http, $routeParams, $location) {
  $scope.requestResponses = [];
  $scope.requestInitiations = [];
  $scope.offerResponses = [];
  $scope.offerInitiations = [];

  // Currently (02/26/2014), a bulletin is never marked as resolved.
  //     If this is added, we should support that here
  $scope.bulletinsOpen = [];
  $scope.bulletinsExpired = [];

  $http.get('/messages').success(function(data) {
    console.log(data);
    $scope.requestResponses = data.requestResponses;
    $scope.requestInitiations = data.requestInitiations;
    $scope.offerResponses = data.offerResponses;
    $scope.offerInitiations = data.offerInitiations;
  });

  // Get bulletins
  $http.get('/bulletins/me').success(function(bulletins) {
    $scope.bulletinsOpen = bulletins.bulletinsOpen;
    $scope.bulletinsExpired = bulletins.bulletinsExpired;
  });

  $scope.deleteBulletin = function(bulletinID) {
    $http.delete('/bulletins/' + bulletinID).success(function() {
      _.remove($scope.bulletinsOpen, function(bulletin) {
        return bulletin.id === bulletinID;
      })
    });
  };

  $scope.editBulletin = function(bulletinID) {
    $location.path('/bulletins/' + bulletinID + '/edit');
  };
};

HistoryCtrl.$inject = ['$scope', '$http', '$routeParams', '$location'];