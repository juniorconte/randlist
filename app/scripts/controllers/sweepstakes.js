'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:SweepstakesCtrl
 * @description
 * # SweepstakesCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('SweepstakesCtrl', function ($scope, $window, localStorageService, uuid) {

    function load() {
      sweepstakes.head = localStorageService.get('head') || [];
      sweepstakes.body = localStorageService.get('body') || [];
      sweepstakes.list = localStorageService.get('sweepstakes') || [];
    }

    var sweepstakes = this;

    sweepstakes.add = function(name, quantity, filter) {
      sweepstakes.list.push({
        uuid: uuid.generate(),
        name: name,
        filter: filter,
        quantity: quantity
      });

      localStorageService.set('sweepstakes', sweepstakes.list);
    };

    sweepstakes.remove = function(sweepstake) {
      if ($window.confirm('Isso apagará este sorteio, deseja continuar?')) {
        sweepstakes.list.splice(sweepstakes.list.indexOf(sweepstake), true);
        localStorageService.set('sweepstakes', sweepstakes.list);
      }
    };

    sweepstakes.save = function(sweepstake) {
      var index = sweepstakes.list.indexOf(sweepstake);
      sweepstakes.list[index] = sweepstake;

      localStorageService.set('sweepstakes', sweepstakes.list);
    };

    sweepstakes.executed = function(uuid) {
      return sweepstakes.body.filter(function(sweepstake) {
        return sweepstake.control.winFrom === uuid;
      }).length;
    };

    load();

  });
