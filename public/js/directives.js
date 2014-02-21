angular.module('ncook.directives', [])
  .directive('futureDate', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.$parsers.push(function(viewValue) {
          var newValue = ctrl.$modelValue;

          if (moment(viewValue) <= moment()) {
            ctrl.$setValidity('futureDate', false);
          } else {
            ctrl.$setValidity('futureDate', true);
            newValue = viewValue;
          }
          return newValue;
        });
      }
    };
  });