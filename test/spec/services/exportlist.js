'use strict';

describe('Service: exportList', function () {

  // load the service's module
  beforeEach(module('randlistApp'));

  // instantiate service
  var exportList;
  beforeEach(inject(function (_exportList_) {
    exportList = _exportList_;
  }));

  it('should do something', function () {
    expect(!!exportList).toBe(true);
  });

});
