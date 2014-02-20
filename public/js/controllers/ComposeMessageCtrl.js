var ComposeMessageCtrl = function($scope, $http, $routeParams, $location, $window) {
  $scope.offer = $location.search().offer === '1';
  $scope.item = $location.search().item;
  $scope.recipient = { name: '', email: '' };
  $scope.subject =
    '[NeighborCook] ' +
    ($scope.offer ? 'Offer' : 'Request') +
    ($scope.item ? ': ' + $scope.item : '');
  $scope.body = '';

  $http.get('/profile/contact/' + $routeParams.recipientID).success(function(data) {
    $scope.recipient = {
      name: data.recipient.first_name + ' ' + data.recipient.last_name,
      email: data.recipient.email
    };
  });

  $scope.sendEmail = function() {
    var emailURL = "mailto:" + $scope.recipient.email +
                   "?subject=" + $scope.subject +
                   "&body=" + $scope.body;
    $window.open(emailURL);
  };
};

ComposeMessageCtrl.$inject = ['$scope', '$http', '$routeParams', '$location', '$window'];