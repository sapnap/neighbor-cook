var ComposeMessageCtrl = function($scope, $http, $routeParams, $location, $window, UserService) {
  $scope.offer = $location.search().offer === '1';
  $scope.item = $location.search().item;
  $scope.recipient = { name: '', email: '' };
  $scope.subject =
    '[NeighborCook] ' +
    ($scope.offer ? 'Offer' : 'Request') +
    ($scope.item ? ': ' + $scope.item : '');
  $scope.body = '';

  UserService.
    getCurrentUser().
    success(function(user) { $scope.user = user; }).
    error(function() { $scope.user = {}; });

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
    return emailURL;
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
    
    $http.post('/messages', data).success(function(data) {
      console.log("success!!", data);
    });
  };
};

ComposeMessageCtrl.$inject = [
  '$scope', '$http', '$routeParams', '$location', '$window', 'UserService'
];