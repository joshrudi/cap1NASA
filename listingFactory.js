angular.module('listings').factory('Listings', function($http) {
  var methods = {
    search: function(query, startDate, endDate, isImage, isVideo, isAudio, location) {

    	query = encodeURIComponent(query.trim());  // encode for URL

		// below filter conditions makes no sense, assume user got confused
    	if (startDate != undefined && endDate != undefined && startDate > endDate) [startDate, endDate] = [endDate, startDate];  


    	var search = 'https://images-api.nasa.gov/search?q=' + query;
    	var media = '';

    	if (startDate != undefined) search += '&year_start=' + startDate;
    	if (endDate   != undefined)	search += '&year_end=' + endDate;
    	if (location  != undefined) search += '&location=' + location;


    	// the great thing about how this (below) code works, is that if the user has all 3 boxes (image, video, audio) UNchecked,
    	// then it will just search using all three as if they were checked.  There's no point in searching for nothing.
    	if (isImage === true) media += 'image';
    	if (isVideo === true) {
    		if (media.length > 0) media += ',';
    		media += 'video';
    	}
    	if (isAudio === true) {
    		if (media.length > 0) media += ',';
    		media += 'audio';
    	}

    	if (media.length > 0) search += '&media_type=' + media;

    	
    	return $http.get(search);
    },

    getLink: function(link) {
    	return $http.get(link);
    }
  };

  return methods;
});