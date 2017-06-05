'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:SweepstakeCtrl
 * @description
 * # SweepstakeCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('SweepstakeCtrl', function ($scope, $window, $log, $routeParams, $location, exportList, localStorageService) {

    function current(element) {
      return element.uuid === sweepstake.uuid;
    }

    function load() {
      sweepstake.head = localStorageService.get('head') || [];
      sweepstake.body = localStorageService.get('body') || [];
      sweepstake.sweepstakes = localStorageService.get('sweepstakes') || [];

      sweepstake.name = sweepstake.sweepstakes.find(current).name;
      sweepstake.filter = sweepstake.sweepstakes.find(current).filter;
      sweepstake.quantity = sweepstake.sweepstakes.find(current).quantity;

      sweepstake.makeWinnerList();
    }

    function makeCSV(head, body) {
      if (head.length && body.length) {
        var rows = body.map(function(row) {
          return row.data.concat(row.control.winAt);
        });

        head.push('sorteio');
        rows.unshift(head);

        return rows.map(function(row) {
          return row.join(',');
        }).join('\n');
      }
    }

    var sweepstake = this;

    sweepstake.uuid = $routeParams.uuid;
    sweepstake.register = null;
    sweepstake.winners = [];

    sweepstake.run = function() {
      var candidates = sweepstake.body.filter(function(candidate) {
        if (sweepstake.filter) {
          var sandbox = $scope.$new();

          sweepstake.head.forEach(function(column, index) {
            sandbox[column] = angular.copy(candidate.data[index]);
          });

          try {
            return !candidate.control.win && sandbox.$eval(sweepstake.filter);
          } catch(err) {
            return !candidate.control.win;
          }
        } else {
          return !candidate.control.win;
        }
      });

      if (candidates.length > 0) {
        var random = Math.floor(Math.random() * candidates.length);
        var winner = candidates[random];
        var index = sweepstake.body.indexOf(winner);

        sweepstake.register = winner.data.toString();

        sweepstake.body[index].control.win = true;
        sweepstake.body[index].control.winAt = new Date();
        sweepstake.body[index].control.winFrom = sweepstake.uuid;

        localStorageService.set('body', sweepstake.body);
        load();
      } else {
        sweepstake.register = null;
        $window.alert('Não há mais candidatos disponíveis');
      }

      return candidates.length && candidates.length - 1 || 0;
    };

    sweepstake.runAll = function() {
      while (sweepstake.winners.length < sweepstake.quantity) {
        if (!sweepstake.run()) { break; }
      }
    };

    sweepstake.makeWinnerList = function() {
      sweepstake.winners = sweepstake.body.filter(function(candidate) {
        return candidate.control.win &&
          candidate.control.winFrom === sweepstake.uuid;
      });
    };

    sweepstake.abort = function(winner) {
      if ($window.confirm('Isso anulará este sorteado, deseja continuar?')) {
        winner.control.win = false;
        winner.control.winAt = null;
        winner.control.winFrom = null;
        localStorageService.set('body', sweepstake.body);
        load();
      }
    };

    sweepstake.print = function() {
      $window.print();
    };

    sweepstake.exportCSV = function(head, body) {
      if (head.length && body.length) {
        var copyHead = angular.copy(head);
        var copyBody = angular.copy(body);
        var csv = makeCSV(copyHead, copyBody);
        exportList.save(sweepstake.name  + '.csv', csv);
      }
    };

    (function(data) {
      if (data) {
        try {
          sweepstake.register = atob(data);
        } catch(e) {
          $log.info(e);
          $window.alert('Identificador de registro inválido');
          $location.path('/sweepstakes');
        }
      }
    })($routeParams.register);

    load();

  });
