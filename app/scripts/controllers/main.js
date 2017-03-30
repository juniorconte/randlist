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
      main.totalRegisters = localStorageService.get('body').length;
      main.totalSweepstakes = localStorageService.get('sweepstakes').length;
    }

    var main = this;

    main.totalRegisters =  0;
    main.totalSweepstakes = 0;

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
