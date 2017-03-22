'use strict';

/**
 * @ngdoc directive
 * @name randlistApp.directive:onReadFile
 * @description https://jsfiddle.net/alexsuch/6aG4x/
 * # onReadFile
 */
angular.module('randlistApp')
  .directive('onReadFile', function ($parse) {
    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs) {
        var fn = $parse(attrs.onReadFile);

        element.on('change', function(onChangeEvent) {
          var reader = new FileReader();
          var changeEvent = angular.copy(onChangeEvent);

          reader.onload = function(onLoadEvent) {
            scope.$apply(function() {
              fn(scope, {$fileContent:onLoadEvent.target.result});
            });
          };

          reader
            .readAsText((changeEvent.srcElement || changeEvent.target)
            .files[0]);

          element.val(undefined);
        });
      }
    };
  });
