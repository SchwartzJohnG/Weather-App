(function() {
  angular.module('weatherWidget')
    .controller('WeatherCtrl', ['weatherService', function(weatherService) {
      var vm = this;
      vm.location = "";
      vm.data = {};
      vm.gps = {
        lat: 41,
        lng: -77
      };
      vm.dateNow = Date.now();
      vm.page = "today";
      vm.oneHour = weatherService.oneHour(vm.dateNow);

//Uses google maps api to search for location and return the gps coordinates. Searching then fires the initilizing function for the weather object.
      vm.citySearch = function(loc) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': loc
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
            vm.gps.lat = results[0].geometry.location.lat();
            vm.gps.lng = results[0].geometry.location.lng();
            vm.setWeatherObj(vm.gps);
            vm.location = results;
            console.log(vm.location);
          } else {
            console.log("Something went wrong " + status);
          }
        });
      }
//initializes the weather object using the service
      vm.setWeatherObj = function(gps) {
        weatherService.getCurrent(gps.lat, gps.lng, function(data) {
            vm.data.currently = angular.fromJson(data);
          })
        weatherService.getCurrentb(gps.lat, gps.lng, vm.oneHour, function(data) {
            vm.data.oneHour = angular.fromJson(data);
          })
        vm.getDaily = weatherService.getDaily(gps.lat, gps.lng, function(data) {
          vm.data.daily = angular.fromJson(data);
        })
      }
    }])
})()
