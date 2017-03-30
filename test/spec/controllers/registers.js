'use strict';

describe('Controller: RegistersCtrl', function () {

  // load the controller's module
  beforeEach(module('randlistApp'));

  var RegistersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistersCtrl = $controller('RegistersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
