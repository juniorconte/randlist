'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('randlistApp'));

  var ListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListCtrl = $controller('ListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(ListCtrl.awesomeThings.length).toBe(3);
  });
});
