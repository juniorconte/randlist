'use strict';

/**
 * @ngdoc overview
 * @name randlistApp
 * @description
 * # randlistApp
 *
 * Main module of the application.
 */
angular
  .module('randlistApp', [
    'ngRoute',
    'ngAnimate',
    'ngFileSaver',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/importation', {
        templateUrl: 'views/importation.html',
        controller: 'ImportationCtrl',
        controllerAs: 'importation'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .when('/sweepstakes', {
        templateUrl: 'views/sweepstakes.html',
        controller: 'SweepstakesCtrl',
        controllerAs: 'sweepstakes'
      })
      .when('/sweepstakes/:uuid', {
        templateUrl: 'views/sweepstake.html',
        controller: 'SweepstakeCtrl',
        controllerAs: 'sweepstake'
      })
      .otherwise({
        redirectTo: '/sweepstakes'
      });
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('randlist')
      .setStorageType('localStorage');
  });
