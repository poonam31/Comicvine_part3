var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource, $location) {

  //console.log("url: "+$location.absUrl());

  var url = $location.absUrl().split('/');
  var comicID = url[url.length - 1];

  var mainID = url[url.length - 3];
  var challengerID = url[url.length - 1];

 // console.log("comic id : "+comicID);

  var factory = {};

  factory.routes = {
    comicAPI: $resource('/comic/:action', {}, {
      fetch: {method: 'GET', params: {title: '@title', action: 'search'}, isArray: false },
      details: {method: 'GET', params: {id: comicID, action: 'details'}, isArray: false },
      versus: {method: 'GET', params: {main: mainID, challenger: challengerID, action: 'versus'}, isArray: false }

    })
  };

  return factory;
});

app.controller('comicController', function($scope, resources) {

  $scope.searchComic = function() {

  resources.routes.comicAPI.fetch({title: $scope.title}, function done(response) {
      console.log(response);
      if (response.results.length > 0)
        $scope.comics = { main: response.results.shift(0), alternatives: response.results };
      else 
        $scope.comics = response.results;
    });
  };

});

app.controller('comicDetailController', function($scope, resources) {

  function init() {
    resources.routes.comicAPI.details(function done(response) {
      console.log(response);
        $scope.comic = response;
    });
  }
  
  init();

   $scope.togglePowers = function() {
    if ($scope.displayPowers) {
      $scope.powersBtnText = '+ Powers';
      $scope.displayPowers = false;
    }
    else {
      $scope.powersBtnText = '- Powers';
      $scope.displayPowers = true;
    }
  };

  $scope.toggleFriends = function() {
    if ($scope.displayFriends) {
      $scope.friendsBtnText = '+ Friends';
      $scope.displayFriends = false;
    }
    else {
      $scope.friendsBtnText = '- Friends';
      $scope.displayFriends = true;
    }
  };

  $scope.toggleEnemies = function() {
    if ($scope.displayEnemies) {
      $scope.enemiesBtnText = '+ Enemies';
      $scope.displayEnemies = false;
    }
    else {
      $scope.enemiesBtnText = '- Enemies';
      $scope.displayEnemies = true;
    }
  };


});

app.controller('comicVersusController', function($scope, resources) {

  function init() {
    resources.routes.comicAPI.versus(function done(response) {
      console.log(response);
        $scope.comic = response;
    });
  }

  init();
});