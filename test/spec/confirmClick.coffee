'use strict'

describe 'Directive: confirmClick', ->

  beforeEach module 'confirmClick'

  scope = {}

  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<confirm-click></confirm-click>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the confirmClick directive'
