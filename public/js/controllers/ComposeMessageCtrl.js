var ComposeMessageCtrl = function($scope, $http, $routeParams, $location, $window) {
  $scope.user = []
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

  // TODO: should put this in AuthService factory to avoid this repeated code in every controller
  $http.get('/profile/me').success(function(data) {
    $scope.user = data;
  });

  $scope.sendEmail = function() {
    var emailURL = "mailto:" + $scope.recipient.email +
                   "?subject=" + $scope.subject +
                   "&body=" + $scope.body;
    $window.open(emailURL);
  };

  $scope.addHistory = function() {
    var data = {};
    if ($scope.offer) {
      data = {
        offerer_id: $scope.user.id,
        requester_id: $routeParams.recipientID,
        item: $scope.item
      };
    } else {
      data = {
        offerer_id: $routeParams.recipientID,
        requester_id: $scope.user.id,
        item: $scope.item
      };
    }
    console.log('add message history', data);
    $http.post('/messages', data).success(function(data) {
      console.log("success!!", data);
      // $window.location = '/';
    });
  };
};

ComposeMessageCtrl.$inject = ['$scope', '$http', '$routeParams', '$location', '$window'];