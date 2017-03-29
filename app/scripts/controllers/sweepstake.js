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
    sweepstake.winners = [];

    sweepstake.run = function() {
      var candidates = sweepstake.body.filter(function(candidate) {
        if (sweepstake.filter) {
          var sandbox = $scope.$new();

          sweepstake.head.forEach(function(collum, index) {
            sandbox[collum] = angular.copy(candidate.data[index]);
          });

          return !candidate.control.win && sandbox.$eval(sweepstake.filter);
        } else {
          return !candidate.control.win;
        }
      });

      if (candidates.length > 0) {
        var random = Math.floor(Math.random() * candidates.length);
        var winner = candidates[random];
        var index = sweepstake.body.indexOf(winner);

        sweepstake.body[index].control.win = true;
        sweepstake.body[index].control.winAt = new Date();
        sweepstake.body[index].control.winFrom = sweepstake.uuid;

        localStorageService.set('body', sweepstake.body);
        load();
      } else {
        $window.alert('Não há mais candidatos disponíveis');
      }
    };

    sweepstake.makeWinnerList = function() {
      sweepstake.winners = sweepstake.body.filter(function(candidate) {
        return candidate.control.win &&
          candidate.control.winFrom === sweepstake.uuid;
      });
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
