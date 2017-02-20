(function() {
  angular.module("weatherWidget", ['dark-sky', 'ui.bootstrap'])
    .config(['darkSkyProvider', function(darkSkyProvider) {
      darkSkyProvider.setApiKey('9de417925789cfd7e7f66d071a096ffa');
    }]);

})()
