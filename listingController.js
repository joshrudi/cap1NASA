angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {

    $scope.listings = [];   //contains search results of current page
    $scope.nav = [];        //contains next and/or prev page links
    $scope.hits = [];       //contains the number of results
    $scope.curPage = 0;     //stores the current page
    $scope.curEndRange = 0; //stores the current end of the range
    $scope.history = [];    //stores search history
    // (below) updates history var if items exist
    if (window.localStorage.getItem('nasaHistory') != null) $scope.history = window.localStorage.getItem('nasaHistory').split(0x00);


    /* loads listings with a default view so visitors have something to see by default */
    /* search using query, then bind to scope */
      Listings.search("earth").then(function(response) {
        $scope.listings = response.data.collection.items;
        $scope.nav = response.data.collection.links;
        $scope.hits = response.data.collection.metadata.total_hits;
        if ($scope.hits - (($scope.curPage+1)*100) < 0) $scope.curEndRange = $scope.hits;
        else $scope.curEndRange = (($scope.curPage+1)*100);
        console.log($scope.listings);
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });

    $scope.search = function() {

      // add to search history
      $scope.history.push($scope.query);

      // update localStorage history (separated by the null character)
      window.localStorage.setItem('nasaHistory', $scope.history.join(0x00));
      
      /* search using query, then bind to scope */
      Listings.search($scope.query, $scope.startDate, $scope.endDate, $scope.isImage, $scope.isVideo, $scope.isAudio, $scope.location).then(function(response) {
        $scope.listings = response.data.collection.items;
        $scope.nav = response.data.collection.links;
        $scope.hits = response.data.collection.metadata.total_hits;
        $scope.curPage = 0;
        if ($scope.hits - (($scope.curPage+1)*100) < 0) $scope.curEndRange = $scope.hits;
        else $scope.curEndRange = (($scope.curPage+1)*100);
        console.log($scope.listings);
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });
    };

    $scope.clearHistory = function() {

      // wipes search history
      $scope.history = [];
      window.localStorage.removeItem('nasaHistory');
    }

    $scope.getPrev = function() {

      // if prev exists
      if ($scope.nav.length > 0 && $scope.nav[0].rel === "prev") {

        /* search using prev href, then bind to scope */
        Listings.getLink($scope.nav[0].href).then(function(response) {
          $scope.listings = response.data.collection.items;
          $scope.nav = response.data.collection.links;
          $scope.curPage = $scope.curPage - 1;
          if ($scope.hits - (($scope.curPage+1)*100) < 0) $scope.curEndRange = $scope.hits;
          else $scope.curEndRange = (($scope.curPage+1)*100);
          console.log($scope.listings);
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }
    }

    $scope.getNext = function() {

      // if next exists in first index
      if ($scope.nav.length > 0 && $scope.nav[0].rel === "next") {

        /* search using next href, then bind to scope */
        Listings.getLink($scope.nav[0].href).then(function(response) {
          $scope.listings = response.data.collection.items;
          $scope.nav = response.data.collection.links;
          $scope.curPage = $scope.curPage + 1;
          if ($scope.hits - (($scope.curPage+1)*100) < 0) $scope.curEndRange = $scope.hits;
          else $scope.curEndRange = (($scope.curPage+1)*100);
          console.log($scope.listings);
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }

      // check second index
      if ($scope.nav.length > 1 && $scope.nav[1].rel === "next") {

        /* search using next href, then bind to scope */
        Listings.getLink($scope.nav[1].href).then(function(response) {
          $scope.listings = response.data.collection.items;
          $scope.nav = response.data.collection.links;
          $scope.curPage = $scope.curPage + 1;
          if ($scope.hits - (($scope.curPage+1)*100) < 0) $scope.curEndRange = $scope.hits;
          else $scope.curEndRange = (($scope.curPage+1)*100);
          console.log($scope.listings);
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }
    }

    $scope.getFile = function(type, url) {

        /* search using url, then bind to scope */
        Listings.getLink(url).then(function(response) {

          console.log(type);
          console.log(response);

          if (type === "image") {

              for (var i = 0; i < response.data.length; i++) {

                if (response.data[i].search("orig.jpg") != -1) {

                window.open(response.data[i]);
                i = response.data.length;
              }
            }
          }
          else if (type === "video") {

              for (var i = 0; i < response.data.length; i++) {

                if (response.data[i].search("mp4") != -1) {

                  window.open(response.data[i]);
                  i = response.data.length;
              }
            }
          }
          else if (type === "audio") {

            for (var i = 0; i < response.data.length; i++) {

                  if (response.data[i].contains("orig.wav")) {

                  window.open(response.data[i]);
                  i = response.data.length;
                }
              }
            }

        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
    }
  }
]);