angular.module('ncook.services', ['ng'])
  .factory('TypeaheadService', ['$http', function($http) {
    return {
      items: function(query) {
        var success = function(result) {
          return result.data;
        };

        // return a promise object for typeahead
        return $http.get('/search/typeahead?query=' + query).then(success);
      }
    }
  }])
  .factory('TransferSearchService', [function() {
    var query = '';
    return {
      getQuery: function() {
        return query;
      },
      setQuery: function(q) {
        query = q;
      }
    }
  }])
  .factory('UserService', ['$http', function($http) {
    var currentUser = {};

    // TODO handle failure
    $http.get('/profile/me').success(function(data) {
      currentUser = data;
    });

    return {
      getCurrentUser: function() {
        return currentUser;
      }
    }
  }]);