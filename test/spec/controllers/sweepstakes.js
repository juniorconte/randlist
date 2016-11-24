'use strict';

describe('Controller: SweepstakesCtrl', function () {

  // load the controller's module
  beforeEach(module('randlistApp'));

  var SweepstakesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SweepstakesCtrl = $controller('SweepstakesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(SweepstakesCtrl.awesomeThings.length).toBe(3);
  });
});
