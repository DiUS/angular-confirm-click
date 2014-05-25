[![Build Status](https://travis-ci.org/DiUS/angular-confirm-click.svg?branch=master)](https://travis-ci.org/DiUS/angular-confirm-click)

angular-confirm-click
=====================

An AngularJS directive which will display a confirmation message when a user clicks on a button, all inline.

The buttons text will be replaced with the confirmation message on first click, then the subsequent click will 
perform the action. There are also css animations which will increase and decrease the size of the button elegantly.

This project was generated using [generator-angulator](https://github.com/azzamallow/generator-angulator).

install
-------

```
bower install angular-confirm-click
```

development
-----------

For those who wish to fork the project and make changes, you can view the [readme](https://github.com/azzamallow/generator-angulator/blob/master/README.md#develop-and-maintain-your-component) at [generator-angulator](https://github.com/azzamallow/generator-angulator) on how to maintain the project.

Please feel free to submit a pull request so everyone can benefit from your changes :)

usage
-----

Make sure you include the module in your application config

```
angular.module('myApp', [
  'confirmClick',
  ...
]);
```

Use the directive on a clickable element, like a button.

```
<button confirm-click="delete(item);" confirm-message="Are you sure?">Delete</button>
```

The text in the button is as expected
```
angular.element('button').text() === 'Delete';
```

When the user clicks on the button, the text will change in the button

```
angular.element('button').text() === 'Are you sure?';
```

When the user clicks again, the action `delete(item);` will be performed

If the user does not confirm, the text reverts back to `Delete` after 1500ms 
