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
      return 'head' in file && 'body' in file && 'sweepstakes' in file;
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

    importation.loadBackup = function(fileRandListBase64) {
      var unBase64 = atob(fileRandListBase64);
      var parsedJson = angular.fromJson(unBase64);

      if (parsedJson !== undefined && fileIsValid(parsedJson)) {
        localStorageService.set('head', parsedJson.head);
        localStorageService.set('body', parsedJson.body);
        localStorageService.set('sweepstakes', parsedJson.sweepstakes);
        $location.path('/registers');
      }
    };

    importation.makeTable = function(file, separator, firstIsHead) {
      if (!file) { return; }

      var splitLine = file.indexOf('\r') > -1 ? '\r' : '\n';

      var rows = file.split(splitLine).map(function(row) {
        return row.split(separator === '\\t' ? '\t' : (separator || ' '));
      }).filter(function(row) {
        return row.some(function(column) {
          return !!column;
        });
      });

      if (firstIsHead) {
        importation.table.head = rows.shift();
      } else {
        importation.table.head = Array.apply(null, new Array(rows[0].length));
      }

      importation.table.body = rows;
    };

    importation.toggleColumn = function(position) {
      var index = importation.ignored.indexOf(position);

      if (index > -1) {
        importation.ignored.splice(index, true);
      } else {
        importation.ignored.push(position);
      }
    };

    importation.isIgnoredColumn = function(position) {
      return importation.ignored.indexOf(position) > -1;
    };

    importation.proccess = function(table, ignored) {
      var body = table.body.map(function(row) {
        return {
          data: row.map(cleanString).filter(function(cell, index) {
            return ignored.indexOf(index) === -1;
          }),
          control: {
            win: false,
            winAt: null,
            winFrom: null
          }
        };
      });

      var head = table.head.filter(function(column, index) {
        return ignored.indexOf(index) === -1;
      }).map(cleanString);

      localStorageService.set('head', head);
      localStorageService.set('body', body);

      $location.path('/registers');
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
