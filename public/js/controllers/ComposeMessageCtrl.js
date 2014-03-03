var ComposeMessageCtrl = function($scope, $http, $routeParams, $location, $window, $q, UserService) {
  $scope.offer = $location.search().offer === '1';
  $scope.item = $location.search().item;
  $scope.recipient = { name: '', email: '' };
  $scope.subject =
    '[Epulo] ' +
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

  $scope.addHistory = function() {
    var data = {};
    if ($scope.offer) {
      data = {
        offerer_id: $scope.user.id,
        requester_id: $routeParams.recipientID,
        item: $scope.item,
        initiator: 'offerer'
      };
    } else {
      data = {
        offerer_id: $routeParams.recipientID,
        requester_id: $scope.user.id,
        item: $scope.item,
        initiator: 'requester'
      };
    }
    
    var email_data = {
      sender_email: $scope.user.email,
      recipient_email: $scope.recipient.email,
      is_offer: $scope.offer,
      item: $scope.item,
      subject: $scope.subject,
      body: $scope.body
    };

    $q.all({
      history: $http.post('/messages', data),
      email: $http.post('/email', email_data)
    }).then(function() {
      ga('send', 'event', 'email', 'click');
      $location.search('notice', 'Your email has been sent!').path("/");
    });
  };
};

ComposeMessageCtrl.$inject = [
  '$scope', '$http', '$routeParams', '$location', '$window', '$q', 'UserService'
];