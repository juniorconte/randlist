'use strict';

/**
 * @ngdoc function
 * @name randlistApp.controller:ImportationCtrl
 * @description
 * # ImportationCtrl
 * Controller of the randlistApp
 */
angular.module('randlistApp')
  .controller('ImportationCtrl', function ($scope, $location, localStorageService) {

    function cleanString(string) {
      return string.trim().replace('\r', '');
    }

    function identifySeparator(csv) {
      if (csv.indexOf(',') > -1) { return ','; }
      if (csv.indexOf(';') > -1) { return ';'; }
      if (csv.indexOf('\t') > -1) { return '\\t'; }
      if (csv.indexOf('|') > -1) { return '|'; }
    }

    function fileIsValid(file) {
      return 'head' in file && 'body' in file && 'filter' in file;
    }

    var importation = this;

    importation.file = null;
    importation.separator = null;
    importation.firstIsHead = true;
    importation.ignored = [];
    importation.table = {
      head: [],
      body: []
    };

    importation.loadFile = function(csv) {
      importation.file = csv;
      importation.separator = identifySeparator(csv);
    };

    importation.makeTable = function(file, separator, firstIsHead) {
      if (!file) { return; }

      var rows = file.split('\n').map(function(row) {
        return row.split(separator === '\\t' ? '\t' : (separator || ' '));
      }).filter(function(row) {
        return row.some(function(collum) {
          return !!collum;
        });
      });

      if (firstIsHead) {
        importation.table.head = rows.shift();
      } else {
        importation.table.head = Array.apply(null, new Array(rows[0].length));
      }

      importation.table.body = rows;
    };

    importation.toggleCollum = function(position) {
      var index = importation.ignored.indexOf(position);

      if (index > -1) {
        importation.ignored.splice(index, true);
      } else {
        importation.ignored.push(position);
      }
    };

    importation.isIgnoredCollum = function(position) {
      return importation.ignored.indexOf(position) > -1;
    };

    importation.proccess = function(table, ignored) {
      var body = table.body.map(function(row) {
        var content = {
          data: row.map(cleanString).filter(function(cell, index) {
            return ignored.indexOf(index) === -1;
          }),
          control: {}
        };

        if (!!content.data.toString()) {
          content.control.win = false;
          content.control.winAt = null;
        }

        return content;
      });

      var head = table.head.filter(function(collum, index) {
        return ignored.indexOf(index) === -1;
      });

      localStorageService.set('head', head);
      localStorageService.set('body', body);

      $location.path('/list');
    };

    importation.loadBackup = function(fileRandListBase64) {
      var unBase64 = atob(fileRandListBase64);
      var parsedJson = angular.fromJson(unBase64);

      if (parsedJson !== undefined && fileIsValid(parsedJson)) {
        localStorageService.set('head', parsedJson.head);
        localStorageService.set('body', parsedJson.body);
        localStorageService.set('filter', parsedJson.filter);
        $location.path('/list');
      }
    };

    $scope.$watchGroup([
      'importation.file',
      'importation.separator',
      'importation.firstIsHead'
    ], function(current, before) {
      if (current && (before !== current)) {
        importation.makeTable(
          importation.file,
          importation.separator,
          importation.firstIsHead
        );
      }
    });

  });
