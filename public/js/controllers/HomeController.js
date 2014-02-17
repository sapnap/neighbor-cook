var HomeController = function($scope, $http, $filter) {
  $scope.authored = [];
  $scope.offers = [];
  $scope.requests = [];
  $scope.results = [];
  $scope.doneQuery = '';
  $scope.query = '';

  $scope.errorNotLoggedIn = false;
  $http.get('/bulletins').success(function(data) {
    $scope.errorNotLoggedIn = data.errorNotLoggedIn;
    $scope.authored = data.authored;
    $scope.offers = data.offers;
    $scope.requests = data.requests;
  });

  $scope.search = function() {
    $http.get('/search?query=' + $scope.query).success(function(data) {
      $scope.results = data.results;
      $scope.doneQuery = data.query;
    });
  };
}

HomeController.$inject = ['$scope', '$http', '$filter'];
