angular.module('ncook.filters', []).
  filter('sentenceCase', function() {
    return function(input) {
      if (typeof input != "string" || input.length === 0) {
        return input;
      } else {
        return input[0].toUpperCase() + input.substring(1);
      }
    }
  });