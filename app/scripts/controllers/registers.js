'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:RegistersCtrl
 * @description
 * # RegistersCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('RegistersCtrl', function ($window, localStorageService, exportList) {

    function load() {
      registers.head = localStorageService.get('head') || [];
      registers.body = localStorageService.get('body') || [];
    }

    var registers = this;

    registers.clean = function() {
      if ($window.confirm('Isso apagará todos os dados inclusive os sorteios, deseja continuar?')) {
        localStorageService.clearAll();
        load();
      }
    };

    registers.add = function(newer) {
      registers.body.push({
        data: Object.values(newer),
        control: {
          win: false,
          winAt: null
        }
      });

      localStorageService.set('body', registers.body);
    };

    registers.remove = function(register) {
      if ($window.confirm('Isso apagará este registro, deseja continuar?')) {
        registers.body.splice(registers.body.indexOf(register), true);
        localStorageService.set('body', registers.body);
      }
    };

    registers.save = function() {
      if (!registers.head.length || !registers.body.length) { return; }

      var fileRandList = {
        head: localStorageService.get('head') || {},
        body: localStorageService.get('body') || [],
        sweepstakes: localStorageService.get('sweepstakes') || []
      };

      var toJson = angular.toJson(fileRandList);
      var base64 = btoa(toJson);

      exportList.save('backup.randlist', base64);
    };

    registers.eBase64 = function(data) {
      return btoa(data);
    };

    load();

  });
