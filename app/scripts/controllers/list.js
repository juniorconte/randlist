'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('ListCtrl', function ($window, localStorageService) {

    var list = this;

    list.proccess = function proccess(csv) {
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

      localStorageService.set('head', list.head);
      localStorageService.set('body', list.body);
    };

    list.clean = function clean() {
      if ($window.confirm('Isso apagará toda a lista, deseja continuar?')) {
        list.head = [];
        list.body = [];

        localStorageService.clearAll();
      }
    };

    (function load() {
      list.head = localStorageService.get('head') || [];
      list.body = localStorageService.get('body') || [];
    })();

  });
