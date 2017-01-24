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

    function load() {
      list.head = localStorageService.get('head') || [];
      list.body = localStorageService.get('body') || [];
    }

    list.proccess = function(csv, separator) {
      var table = csv.split('\n').map(function(row, index) {
        var content = {
          data: row.split(separator || ','),
          control: {}
        };

        if (!!content.data.toString() && index) {
          content.control.index = index;
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
      load();
    };

    list.clean = function clean() {
      if ($window.confirm('Isso apagará toda a lista, deseja continuar?')) {
        localStorageService.clearAll();
        load();
      }
    };

    load();

  });
