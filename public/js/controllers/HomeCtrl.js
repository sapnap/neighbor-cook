var HomeCtrl = function($scope, $http, $location, TypeaheadService, TransferSearchService) {
  $scope.query = TransferSearchService.getQuery();
  $scope.notice = $location.search().notice;
  $scope.authored = [];
  $scope.offers = [];
  $scope.requests = [];

  $http.get('/bulletins').success(function(data) {
    $scope.authored = data.authored;
    $scope.offers = data.offers;
    $scope.requests = data.requests;
  });

  $scope.$on('$typeahead.select', function(evt) {
    evt.stopPropagation();
    $scope.transferSearch();
  });

  $scope.clearQuery = function() {
    $scope.query = '';
    TransferSearchService.setQuery('');
  };

  // TODO: change url to provide a bookmark-able url with search
  $scope.transferSearch = function() {
    if ($scope.query.length > 0) {
      TransferSearchService.setQuery($scope.query);
      $location.path('/search');
    }
  };

  $scope.typeahead = TypeaheadService.items;

  $scope.recordEvent = function(event, id) {
    // event is 'offer_response' or 'request_response'
    ga('send', 'event', event, 'click');
    ga('send', 'event', event + '_' + id, 'click');
  };

  $scope.deleteBulletin = function(bulletinID) {
    $http.delete('/bulletins/' + bulletinID).success(function() {
      _.remove($scope.authored, function(bulletin) {
        return bulletin.id === bulletinID;
      })
    });
  };

  $scope.editBulletin = function(bulletinID) {
    $location.path('/bulletins/' + bulletinID + '/edit');
  };

  $scope.resetNotice = function() {
    $scope.notice = '';
  };
};

HomeCtrl.$inject = ['$scope', '$http', '$location', 'TypeaheadService', 'TransferSearchService'];
