'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    function calculateTotalStorage() {
      var body = localStorageService.get('body');
      var sweepstakes = localStorageService.get('sweepstakes');

      main.totalRegisters = body && body.length || 0;
      main.totalSweepstakes = sweepstakes && sweepstakes.length || 0;
    }

    var main = this;

    $scope.$on('$routeChangeStart', function(event, next) {
      main.currentControllerAs = next.controllerAs;
    });

    $scope.$on('LocalStorageModule.notification.removeitem', function() {
      calculateTotalStorage();
    });

    $scope.$on('LocalStorageModule.notification.setitem', function() {
      calculateTotalStorage();
    });

    calculateTotalStorage();

  });
