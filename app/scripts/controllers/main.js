'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('MainCtrl', function ($rootScope) {

    var main = this;

    $rootScope.$on('$routeChangeStart', function(event, next) {
      main.currentControllerAs = next.controllerAs;
    });

  });
