'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('ListCtrl', function () {

    var list = this;

    list.head = [];
    list.body = [];

    list.proccess = function(csv) {
      var table = csv
        .split('\n')
        .map(function(row) {
          return row.split(',');
        })
        .filter(function(row) {
          return row.some(function(collum) {
            return !!collum;
          });
        });

      list.head = table.shift();
      list.body = table;
    };

  });
