'use strict';

/**
 * @ngdoc service
 * @name randlistApp.uuid
 * @description
 * # uuid
 * Factory in the randlistApp.
 */
angular.module('randlistApp')
  .factory('uuid', function () {

    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return {
      generate: function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }
    };
  });
