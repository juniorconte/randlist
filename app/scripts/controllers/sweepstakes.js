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

      preview(filter);
    };

    var preview = function(filter) {
      if (filter.length > 0) {
        sweepstakes.filter = filter
        var candidates = sweepstakes.body.filter(function(candidate) {
          if (filter) {
            var sandbox = $scope.$new();

            sweepstakes.head.forEach(function(column, index) {
              sandbox[column] = angular.copy(candidate.data[index]);
            });
            return !candidate.control.win && sandbox.$eval(filter);
          } else {
            return !candidate.control.win;
          }
        });
        sweepstakes.candidates = candidates;
      } else {
        sweepstakes.filter = '';
        sweepstakes.candidates = [];
      }
    };

    sweepstakes.remove = function(sweepstake) {
      if ($window.confirm('Isso apagará este sorteio, deseja continuar?')) {
        sweepstakes.list.splice(sweepstakes.list.indexOf(sweepstake), true);
        localStorageService.set('sweepstakes', sweepstakes.list);
        sweepstakes.filter = '';
        sweepstakes.candidates = [];
      }
    };

    sweepstakes.save = function(sweepstake) {
      var index = sweepstakes.list.indexOf(sweepstake);
      sweepstakes.list[index] = sweepstake;

      localStorageService.set('sweepstakes', sweepstakes.list);

      preview(sweepstake.filter);
    };

    sweepstakes.executed = function(uuid) {
      return sweepstakes.body.filter(function(sweepstake) {
        return sweepstake.control.winFrom === uuid;
      }).length;
    };

    load();

  });
