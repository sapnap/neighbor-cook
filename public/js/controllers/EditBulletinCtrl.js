var EditBulletinCtrl = function($scope, $http, $location, $routeParams, TypeaheadService) {
  $scope.edit = true;
  $scope.error = '';

  $scope.quantity = null;
  $scope.unit = null;

  $scope.$on('$viewContentLoaded', function() {
    $http.get('/bulletins/' + $routeParams.bulletinID).
      success(function(bulletin) {
        $scope.itemName = bulletin.item.name;
        $scope.message = bulletin.message;
        $scope.type = bulletin.type;
        $scope.expiration = moment(bulletin.expiration).format();
      }).
      error(function(data) {
        $scope.error = data.error;

        $scope.itemName = '';
        $scope.expiration =
          moment().endOf('hour').add({ seconds: 1, days: 1}).format();
        $scope.message = '';
        $scope.type = 'request';
      });
  });

  $scope.buildBulletin = function() {
    var data = {
      itemName: $scope.itemName,
      quantity: $scope.quantity,
      unit: $scope.unit,
      expiration: $scope.expiration,
      message: $scope.message,
      type: $scope.type
    };
    $http.put('/bulletins/' + $routeParams.bulletinID, data).
      success(function() {
        $location.path('/');
      }).
      error(function(data) {
        $scope.error = data.error;
      });
  };

  $scope.resetError = function() {
    $scope.error = '';
  };

  $scope.typeahead = TypeaheadService.items;
};

EditBulletinCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'TypeaheadService'];