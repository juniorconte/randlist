'use strict';

describe('Controller: SweepstakeCtrl', function () {

  // load the controller's module
  beforeEach(module('randlistApp'));

  var SweepstakeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SweepstakeCtrl = $controller('SweepstakeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
