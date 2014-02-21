var SearchCtrl = function($scope, $http, $location, TypeaheadService, TransferSearchService) {
  $scope.query = '';
  $scope.results = [];
  $scope.doneQuery = '';
  $scope.query = '';

  $scope.$on('$viewContentLoaded', function() {
    $scope.query = TransferSearchService.getQuery();
    $scope.search();
  });

  $scope.search = function() {
    TransferSearchService.setQuery($scope.query);
    $http.get('/search?query=' + $scope.query).success(function(data) {
      $scope.results = data.results;
      $scope.doneQuery = data.query;
    });
  };

  $scope.typeahead = TypeaheadService.items;
};

SearchCtrl.$inject = ['$scope', '$http', '$location', 'TypeaheadService', 'TransferSearchService'];