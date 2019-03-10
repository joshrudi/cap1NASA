angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {

    $scope.listings = [];   //contains search results of current page
    $scope.nav = [];        //contains next and/or prev page links
    $scope.file = [];       //contains the links to a given items files (.mp4/.png/etc...)

    /* loads listings with a default view so visitors have something to see by default */
    /* search using query, then bind to scope */
      Listings.search("earth").then(function(response) {
        $scope.listings = response.data.collection.items;
        $scope.nav = response.data.collection.links;
        console.log($scope.listings);
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });

    $scope.search = function() {
      
      /* search using query, then bind to scope */
      Listings.search($scope.query).then(function(response) {
        $scope.listings = response.data.collection.items;
        $scope.nav = response.data.collection.links;
        console.log($scope.listings);
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });
    };

    $scope.getPrev = function() {

      // if prev exists
      if ($scope.nav.length > 0 && $scope.nav[0].rel === "prev") {

        /* search using prev href, then bind to scope */
        Listings.getLink($scope.nav[0].href).then(function(response) {
          $scope.listings = response.data.collection.items;
          $scope.nav = response.data.collection.links;
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
          console.log($scope.listings);
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }
    }

    $scope.getFile = function(type, url) {


    }
  }
]);