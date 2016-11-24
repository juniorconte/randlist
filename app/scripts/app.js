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
      .when('/', {
      })
      })
      .otherwise({
        redirectTo: '/'
      });
  });
