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


    function cleanString(string) {
      return string.trim().replace('\r', '');
    }

    list.proccess = function(csv, separator) {
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
      load();
    };

    list.clean = function() {
      if ($window.confirm('Isso apagará toda a lista, deseja continuar?')) {
        localStorageService.clearAll();
        load();
      }
    };

    list.add = function(newer) {
      list.body.push({
        data: Object.values(newer),
        control: {
          win: false,
          winAt: null
        }
      });

      localStorageService.set('body', list.body);
    };

    list.remove = function(candidate) {
      if ($window.confirm('Isso apagará este registro, deseja continuar?')) {
        list.body.splice(list.body.indexOf(candidate), true);
        localStorageService.set('body', list.body);
      }
    };

    load();

  });
