var SearchCtrl = function($scope, $http, $location, TypeaheadService, TransferSearchService) {
  $scope.query = TransferSearchService.getQuery();
  $scope.results = [];
  $scope.doneQuery = '';

  $scope.$on('$viewContentLoaded', function() {
    if ($scope.query.length > 0) {
      $scope.search();
    }
  });

  $scope.$on('$typeahead.select', function(evt) {
    evt.stopPropagation();
    $scope.search();
  });

  $scope.clearQuery = function() {
    $scope.query = '';
    TransferSearchService.setQuery('');
  };

  $scope.search = function() {
    TransferSearchService.setQuery($scope.query);
    $http.get('/search?query=' + $scope.query).success(function(data) {
      $scope.results = data.results;
      $scope.doneQuery = data.query;
    });
  };

  $scope.typeahead = TypeaheadService.items;
};

SearchCtrl.$inject = [
  '$scope', '$http', '$location', 'TypeaheadService', 'TransferSearchService'
];