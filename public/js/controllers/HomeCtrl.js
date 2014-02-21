var HomeCtrl = function($scope, $http, $location, TypeaheadService, TransferSearchService) {
  $scope.query = '';
  $scope.authored = [];
  $scope.offers = [];
  $scope.requests = [];

  $http.get('/bulletins').success(function(data) {
    $scope.authored = data.authored;
    $scope.offers = data.offers;
    $scope.requests = data.requests;
  });

  // TODO doesn't work for some reason
  $scope.$on('$viewContentLoaded', function() {
    $scope.query = TransferSearchService.getQuery();
  });

  // TODO: change url to provide a bookmark-able url with search
  $scope.transferSearch = function() {
    TransferSearchService.setQuery($scope.query);
    $location.path('/search');
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

HomeCtrl.$inject = ['$scope', '$http', '$location', 'TypeaheadService', 'TransferSearchService'];
