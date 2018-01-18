var app = angular.module('melo', []);

app.controller('MainController', function ($scope, $http) {
  //$scope.names = "";
  var titleArray = [];

  loadJSON(function(json) {
    titleArray = angular.fromJson(json);
    $scope.title = angular.fromJson(json);
    console.log(titleArray);
  });






  function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'title.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
  }

});

