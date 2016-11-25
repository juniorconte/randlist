'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:SweepstakesCtrl
 * @description
 * # SweepstakesCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('SweepstakesCtrl', function (localStorageService) {

    var sweepstakes = this;

    function load() {
      sweepstakes.head = localStorageService.get('head') || [];
      sweepstakes.list = localStorageService.get('body') || [];
      sweepstakes.makeWinnerList();
    }

    sweepstakes.winners = [];

    sweepstakes.run = function() {
      var candidates = sweepstakes.list.filter(function(candidate) {
        return !candidate.control.win;
      });

      if (candidates.length > 0) {
        var random = Math.floor(Math.random() * candidates.length);
        var winner = candidates[random];
        var index = sweepstakes.list.indexOf(winner);

        sweepstakes.list[index].control.win = true;
        sweepstakes.list[index].control.winAt = new Date();

        localStorageService.set('body', sweepstakes.list);
        load();
      }
    };

    sweepstakes.makeWinnerList = function() {
      sweepstakes.winners = sweepstakes.list.filter(function(candidate) {
        return candidate.control.win;
      });
    };

    load();

  });
