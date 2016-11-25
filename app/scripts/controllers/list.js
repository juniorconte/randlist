'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('ListCtrl', function ($window) {

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

    list.clean = function() {
      if ($window.confirm('Isso apagará toda a lista, deseja continuar?')) {
        list.head = [];
        list.body = [];
      }
    };

  });
