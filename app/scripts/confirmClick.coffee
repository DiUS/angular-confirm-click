'use strict'

angular.module 'confirmClick', []

angular.module('confirmClick')
  .directive 'confirmClick', ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the confirmClick directive'