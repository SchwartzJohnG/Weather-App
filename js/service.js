(function() {
    angular.module('weatherWidget')
      .service('weatherService', ['$q', 'darkSky', function($q, darkSky) {
          var self = this;

          self.getCurrent = function(lat, long, callback) {
              darkSky.getCurrent(lat, long)
                .then(
                  function(data) {
                    callback(data);
                  })
                .catch(console.warn);
            }
            //overloading the function caused angular to think that the callback wasn't a function. Not an issue, just named the function differently.
          self.getCurrentb = function(lat, long, date, callback) {
            darkSky.getCurrent(lat, long, date)
              .then(
                function(data) {
                  callback(data);
                })
              .catch(console.warn);
          }

          self.getDaily = function(lat, long, callback) {
              darkSky.getDailyForecast(lat, long)
                .then(
                  function(data) {
                    callback(data);
                  })
                .catch(console.warn);
            }
            //Takes the current date, adds an hour, and returns a new date ibject.
          self.oneHour = function(date) {
            var result = new Date(date);
            result.setHours(result.getHours() + 1);
            return result;
          }

        })()
