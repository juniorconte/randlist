'use strict';

describe('Controller: ImportationCtrl', function () {

  // load the controller's module
  beforeEach(module('randlistApp'));

  var ImportationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImportationCtrl = $controller('ImportationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
