'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('HomeCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
