'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:SweepstakesCtrl
 * @description
 * # SweepstakesCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('SweepstakesCtrl', function ($scope, $window, $uibModal, localStorageService, uuid) {

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

    sweepstakes.validateFilter = function(expression) {
      if (!expression) {
        return {
          valid: true,
          error: null
        };
      }

      var sandbox = $scope.$new();

      sweepstakes.head.forEach(function(column, index) {
        sandbox[column] = angular.copy(sweepstakes.body[0].data[index]);
      });

      try {
        sandbox.$eval(expression);

        return {
          valid: true,
          error: null
        };
      } catch (err) {
        return {
          valid: false,
          error: err.name + ': ' + err.message.split('\n')[0]
        };
      }
    };

    sweepstakes.resultFilter = function(expression) {
      return sweepstakes.body.filter(function(candidate) {
        if (!expression) { return true; }

        var sandbox = $scope.$new();

        sweepstakes.head.forEach(function(column, index) {
          sandbox[column] = angular.copy(candidate.data[index]);
        });

        try {
          return sandbox.$eval(expression);
        } catch(err) {
          return false;
        }
      });
    };

    sweepstakes.openFilter = function(expression) {
      var table = $scope.$new();

      table.filter = expression;
      table.head = sweepstakes.head;
      table.body = sweepstakes.resultFilter(expression);

      $uibModal.open({
        templateUrl: 'resultFilter.html',
        size: 'lg',
        scope: table
      });
    };

    sweepstakes.openHelpFilter = function() {
      var content = $scope.$new();

      content.attrs = sweepstakes.head;

      $uibModal.open({
        templateUrl: 'helpFilter.html',
        size: 'lg',
        scope: content
      });
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
    };

    sweepstakes.executed = function(uuid) {
      return sweepstakes.body.filter(function(sweepstake) {
        return sweepstake.control.winFrom === uuid;
      }).length;
    };

    load();

  });
