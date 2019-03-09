angular.module('listings').factory('Listings', function($http) {
  var methods = {
    search: function(query) {
    	return $http.get('https://images-api.nasa.gov/search?q=' + query);
    },

    getLink: function(link) {
    	return $http.get(link);
    }
  };

  return methods;
});
