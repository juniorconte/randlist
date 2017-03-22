'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:ImportationCtrl
 * @description
 * # ImportationCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('ImportationCtrl', function ($location, localStorageService) {

    var importation = this;

    function cleanString(string) {
      return string.trim().replace('\r', '');
    }

    importation.proccess = function(csv, separator) {
      var table = csv.split('\n').map(function(row, index) {
        var content = {
          data: row.split(separator || ',').map(cleanString),
          control: {}
        };

        if (!!content.data.toString() && index) {
          content.control.win = false;
          content.control.winAt = null;
        }

        return content;
      })
      .filter(function(row) {
        return row.data.some(function(collum) {
          return !!collum;
        });
      });

      localStorageService.set('head', table.shift());
      localStorageService.set('body', table);

      $location.path('/list');
    };

  });
