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

	  list.csv = null

    function load() {
      list.head = localStorageService.get('head') || [];
      list.body = localStorageService.get('body') || [];
    }

    list.preproccess = function (csv) {
      list.csv = csv
    }

    list.proccess = function proccess(csv) {
      var sep = $('#sep').val()
      var table = list.csv.split('\n').map(function(row, index) {
          var content = {
            data: row.split(sep),
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
        list.csv = undefined
        localStorageService.clearAll();
        load();
      }
    };

    load();

  });
