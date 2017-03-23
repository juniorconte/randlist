'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:SweepstakesCtrl
 * @description
 * # SweepstakesCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('SweepstakesCtrl', function ($scope, $window, exportList, localStorageService) {

    function load() {
      sweepstakes.head = localStorageService.get('head') || [];
      sweepstakes.list = localStorageService.get('body') || [];
      sweepstakes.filter = localStorageService.get('filter') || null;
      sweepstakes.makeWinnerList();
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

    var sweepstakes = this;

    sweepstakes.winners = [];

    sweepstakes.run = function() {
      var candidates = sweepstakes.list.filter(function(candidate) {
        if (sweepstakes.filter) {
          var sandbox = $scope.$new();

          sweepstakes.head.forEach(function(collum, index) {
            sandbox[collum] = angular.copy(candidate.data[index]);
          });

          return !candidate.control.win && sandbox.$eval(sweepstakes.filter);
        } else {
          return !candidate.control.win;
        }
      });

      if (candidates.length > 0) {
        var random = Math.floor(Math.random() * candidates.length);
        var winner = candidates[random];
        var index = sweepstakes.list.indexOf(winner);

        sweepstakes.list[index].control.win = true;
        sweepstakes.list[index].control.winAt = new Date();

        localStorageService.set('body', sweepstakes.list);
        load();
      } else {
        $window.alert('Não há mais candidatos disponíveis');
      }
    };

    sweepstakes.makeWinnerList = function() {
      sweepstakes.winners = sweepstakes.list.filter(function(candidate) {
        return candidate.control.win;
      });
    };

    sweepstakes.saveFilter = function(value) {
      localStorageService.set('filter', value);
    };

    sweepstakes.print = function() {
      $window.print();
    };

    sweepstakes.exportCSV = function(head, body) {
      if (head.length && body.length) {
        var copyHead = angular.copy(head);
        var copyBody = angular.copy(body);
        var csv = makeCSV(copyHead, copyBody);
        exportList.save('sorteados.csv', csv);
      }
    };

    load();

  });
