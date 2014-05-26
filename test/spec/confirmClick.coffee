'use strict'

describe 'Directive: confirmClick', ->

  beforeEach module 'confirmClick'

  scope    = {}
  $timeout = null
  element  = null

  beforeEach inject ($rootScope, $compile, _$timeout_) ->
    scope = $rootScope.$new()
    scope.confirmed = jasmine.createSpy 'confirmed'
    $timeout = _$timeout_

    element = angular.element '<button confirm-click="confirmed()" confirm-message="Are you sure?">Delete</button>'
    element = $compile(element) scope

    # digest the scope, process the initial confirmationAction
    scope.$digest()

  it 'should transition only max-width style', ->
    expect(element.css('transition')).toBe 'max-width 1s'

  it 'should display the text provided', ->
    expect(element.text()).toBe 'Delete'

  it 'should set the max width of the element to the current width', ->
    expect(element.css('maxWidth')).toBe '47px'

  it 'should not be attached to the DOM', inject ($document) ->
    body = angular.element($document[0]).find 'body'
    expect(body.find('button').length).toBe 0

  describe 'when the user clicks the button', ->
    beforeEach ->
      element.triggerHandler 'click'

    it 'should display the confirm message text', ->
      expect(element.text()).toBe 'Are you sure?'

    it 'should have a max width larger than the text', ->
      expect(element.css('maxWidth')).toBe '300px'

    it 'should acknowledge the button is in the state of confirming', ->
      expect(element.hasClass('confirming')).toBe true

    describe 'if the user does not click the button again', ->
      beforeEach ->
        $timeout.flush()

      it 'should revert back to the original text', ->
        expect(element.text()).toBe 'Delete'

      it 'should set the max width back to the original width', ->
        expect(element.css('maxWidth')).toBe '47px'

      it 'should acknoledge the button is not in the state of confirming', ->
        expect(element.hasClass('confirming')).toBe false

    describe 'if the user clicks the button again', ->
      beforeEach ->
        element.triggerHandler 'click'

      it 'should cancel the timeout which would revert the text back', ->
        $timeout.verifyNoPendingTasks()

      it 'should set the opacity on the button to indicate the click happened', ->
        expect(element.css('opacity')).toBe '0.5'

      it 'should acknowledge the button is not in the state of confirming', ->
        expect(element.hasClass('confirming')).toBe false

      it 'should trigger the confirm click action', ->
        expect(scope.confirmed).toHaveBeenCalled()
