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
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/importation', {
        templateUrl: 'views/importation.html',
        controller: 'ImportationCtrl',
        controllerAs: 'importation'
      })
      .when('/registers', {
        templateUrl: 'views/registers.html',
        controller: 'RegistersCtrl',
        controllerAs: 'registers'
      })
      .when('/sweepstakes', {
        templateUrl: 'views/sweepstakes.html',
        controller: 'SweepstakesCtrl',
        controllerAs: 'sweepstakes'
      })
      .when('/sweepstakes/:uuid/:register?', {
        templateUrl: 'views/sweepstake.html',
        controller: 'SweepstakeCtrl',
        controllerAs: 'sweepstake'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('randlist')
      .setStorageType('localStorage')
      .setNotify(true, true);
  });
