'use strict';

/**
 * @ngdoc service
 * @name randlistApp.exportList
 * @description
 * # exportList
 * Service in the randlistApp.
 */
angular.module('randlistApp')
  .service('exportList', function (FileSaver, Blob) {
    return {
      save: function(fileName, data) {
        fileName = fileName || new Date().getTime() + '.randlist';
        var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, fileName);
      }
    };
  });
