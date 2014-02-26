var CreateBulletinCtrl = function($scope, $http, $location, $window, TypeaheadService) {
  $scope.error = '';

  $scope.itemName = ($location.search().item) ? $location.search().item : '';
  $scope.quantity = null;
  $scope.unit = null;
  $scope.expiration =
    moment().endOf('hour').add({ seconds: 1, days: 1}).format();
  $scope.message = '';
  $scope.type = 'request';

  $scope.buildBulletin = function() {
    var data = {
      itemName: $scope.itemName,
      quantity: $scope.quantity,
      unit: $scope.unit,
      expiration: $scope.expiration,
      message: $scope.message,
      type: $scope.type
    };
    $http.post('/bulletins', data).
      success(function() {
        $location.path('/');
      }).
      error(function(data) {
        $scope.error = data.error;
        $window.scrollTo(0, 0);
      });
  };

  $scope.resetError = function() {
    $scope.error = '';
  };

  $scope.typeahead = TypeaheadService.items;
};

CreateBulletinCtrl.$inject = ['$scope', '$http', '$location', '$window', 'TypeaheadService'];