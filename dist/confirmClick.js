(function () {
  'use strict';
  angular.module('confirmClick', []);
  angular.module('confirmClick').directive('confirmClick', [
    '$timeout',
    function ($timeout) {
      return {
        scope: {},
        link: function (scope, element, attrs) {
          var actionText, hasConfirmed, promise, textWidth;
          actionText = element.text();
          textWidth = null;
          promise = null;
          hasConfirmed = false;
          scope.confirmingAction = false;
          element.css({ transition: 'all 1s' });
          scope.$watch('confirmingAction', function (newVal, oldVal) {
            if (newVal === oldVal && oldVal === false) {
              textWidth = element[0].offsetWidth;
            }
            if (scope.confirmingAction) {
              element.text(attrs.confirmMessage);
              return element.css({ maxWidth: '300px' });
            } else {
              element.text(actionText);
              return element.css({ maxWidth: textWidth });
            }
          });
          return element.bind('click', function () {
            if (!scope.confirmingAction) {
              scope.$apply(function () {
                return scope.confirmingAction = true;
              });
              return promise = $timeout(function () {
                return scope.confirmingAction = false;
              }, 1500);
            } else {
              if (hasConfirmed) {
                return;
              }
              hasConfirmed = true;
              $timeout.cancel(promise);
              element.css({ opacity: '0.5' });
              return scope.$parent.$apply(attrs.confirmClick);
            }
          });
        }
      };
    }
  ]);
}.call(this));