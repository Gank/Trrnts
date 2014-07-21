angular.module('trrntsApp.services', [])
// need promise library to pass back a blank promise if validation fails
.factory('MagnetLinksFactory', ['$http', '$q', function ($http, $q) {
  // Submit Magnet URI
  var create = function (magnetURI) {
    return $http({
      method: 'POST',
      url: '/api/magnets',
      data: {'magnetURI': magnetURI}
    });
  };

  // Retrieves latest magents.
  var latest = function (start, stop) {
    return $http({
      method: 'GET',
      url:'api/magnets/latest',
      params: {
        start: start || 1,
        stop: stop || 30
      }
    });
  };

  // Retrieves top magents.
  var top = function (start, stop) {
    return $http({
      method: 'GET',
      url:'api/magnets/top',
      params: {
        start: start || 1,
        stop: stop || 30
      }
    });
  };

  // Searches torrents whose titles contains input.
  var search = function (input) {
    if (typeof(input) !== 'string') {
      return $q.defer().promise;
    }

    return $http({
      method: 'GET',
      url:'api/magnets',
      params: {
        query: input
      }
    });
  };

  return {
    create: create,
    latest: latest,
    top: top,
    search:search
  };
}])
.factory('SharedService', ['$rootScope', function($rootScope) {
    var sharedService = {};

    sharedService.selectedMagnet = 'default';

    sharedService.prepForBroadcast = function(newMagnet) {
        this.selectedMagnet = newMagnet;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
}]);
