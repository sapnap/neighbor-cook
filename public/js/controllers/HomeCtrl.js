var HomeCtrl = function($scope, $http, TypeaheadService) {
  $scope.authored = [];
  $scope.offers = [];
  $scope.requests = [];
  $scope.results = [];
  $scope.doneQuery = '';
  $scope.query = '';

  $http.get('/bulletins').success(function(data) {
    $scope.authored = data.authored;
    $scope.offers = data.offers;
    $scope.requests = data.requests;
  });

  // TODO: change url to provide a bookmark-able url with search
  $scope.search = function() {
    $http.get('/search?query=' + $scope.query).success(function(data) {
      $scope.results = data.results;
      $scope.doneQuery = data.query;
    });
  };

  $scope.typeahead = TypeaheadService.items;

  $scope.deleteBulletin = function(bulletinID) {
    $http.delete('/bulletins/' + bulletinID).success(function() {
      _.remove($scope.authored, function(bulletin) {
        return bulletin.id === bulletinID;
      })
    });
  };
};

HomeCtrl.$inject = ['$scope', '$http' , 'TypeaheadService'];
