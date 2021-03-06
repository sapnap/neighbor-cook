angular.module('ncook.filters', []).
  filter('sentenceCase', function() {
    return function(input) {
      if (typeof input != "string" || input.length === 0) {
        return input;
      } else {
        return input[0].toUpperCase() + input.substring(1);
      }
    }
  }).
  filter('unsentenceCase', function() {
    return function(input) {
      if (typeof input != "string" || input.length === 0) {
        return input;
      } else {
        return input[0].toLowerCase() + input.substring(1);
      }
    }
  }).
  filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  }).
  filter('calendar', function() {
    return function(date) {
      return moment(date).calendar();
    }
  });