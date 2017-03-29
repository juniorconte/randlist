'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('ListCtrl', function ($window, localStorageService, exportList) {

    function load() {
      list.head = localStorageService.get('head') || [];
      list.body = localStorageService.get('body') || [];
    }

    var list = this;

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

    list.save = function() {
      if (!list.head.length || !list.body.length) { return; }

      var fileRandList = {
        head: localStorageService.get('head') || {},
        body: localStorageService.get('body') || [],
        sweepstakes: localStorageService.get('sweepstakes') || []
      };

      var toJson = angular.toJson(fileRandList);
      var base64 = btoa(toJson);

      exportList.save('backup.randlist', base64);
    };

    list.eBase64 = function(data) {
      return btoa(data);
    };

    load();

  });
