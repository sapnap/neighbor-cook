var HomeCtrl = function($scope, $http, $location, TypeaheadService, TransferSearchService) {
  $scope.query = TransferSearchService.getQuery();
  $scope.authored = [];
  $scope.offers = [];
  $scope.requests = [];

  $http.get('/bulletins').success(function(data) {
    $scope.authored = data.authored;
    $scope.offers = data.offers;
    $scope.requests = data.requests;
  });

  $scope.$on('$typeahead.select', function(evt) {
    evt.stopPropagation();
    $scope.transferSearch();
  });

  // TODO: change url to provide a bookmark-able url with search
  $scope.transferSearch = function() {
    if ($scope.query.length > 0) {
      TransferSearchService.setQuery($scope.query);
      $location.path('/search');
    }
  };

  $scope.typeahead = TypeaheadService.items;

  $scope.deleteBulletin = function(bulletinID) {
    $http.delete('/bulletins/' + bulletinID).success(function() {
      _.remove($scope.authored, function(bulletin) {
        return bulletin.id === bulletinID;
      })
    });
  };

  $scope.editBulletin = function(bulletinID) {
    $location.path('/bulletins/' + bulletinID + '/edit');
  };
};

HomeCtrl.$inject = ['$scope', '$http', '$location', 'TypeaheadService', 'TransferSearchService'];
