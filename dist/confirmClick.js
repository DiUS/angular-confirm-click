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
          element.css({ transition: 'max-width 1s' });
          scope.$watch('confirmingAction', function (newVal, oldVal) {
            if (newVal === oldVal && oldVal === false) {
              return;
            }
            textWidth = textWidth || element[0].offsetWidth;
            if (scope.confirmingAction) {
              element.text(attrs.confirmMessage);
              element.css({ maxWidth: '300px' });
              return element.addClass('confirming');
            } else {
              element.text(actionText);
              element.css({ maxWidth: textWidth });
              return element.removeClass('confirming');
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
              element.removeClass('confirming');
              return scope.$parent.$apply(attrs.confirmClick);
            }
          });
        }
      };
    }
  ]);
}.call(this));