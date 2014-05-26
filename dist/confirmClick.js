(function () {
  'use strict';
  angular.module('confirmClick', []);
  angular.module('confirmClick').directive('confirmClick', [
    '$timeout',
    '$document',
    function ($timeout, $document) {
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
            var body, clone;
            if (newVal === oldVal && oldVal === false) {
              clone = element.clone();
              clone.css({
                left: '-9999px',
                position: 'absolute'
              });
              body = $document[0].body;
              body.appendChild(clone[0]);
              textWidth = clone[0].offsetWidth;
              textWidth = textWidth + 'px';
              body.removeChild(clone[0]);
            }
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