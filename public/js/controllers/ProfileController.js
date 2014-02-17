console.log('profile contr');
var ProfileController = function($scope, $http, $filter) {
  $scope.errorNotLoggedIn = false;
  console.log('got into ProfileController');

  $http.get('/bulletins').success(function(data) {
    console.log('hello there');
    $scope.errorNotLoggedIn = data.errorNotLoggedIn;
  });
}

ProfileController.$inject = ['$scope', '$http', '$filter'];
