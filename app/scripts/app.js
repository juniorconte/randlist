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
    'ngAnimate',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
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
      .otherwise({
        redirectTo: '/list'
      });
  });
