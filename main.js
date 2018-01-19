var app = angular.module('melo', []);

app.controller('MainController', function ($scope, $http) {
  //$scope.names = "";
  var titleObject = new Object();
  $scope.title = [];

  setInterval(function(){
    //location.reload();
  }, 2000)

  loadJSON("title", function(json) {
    titleObject = json;
    $scope.title = Object.getOwnPropertyNames(titleObject);
    console.log($scope.title);
  });

  $scope.fillPayload = function fillPayload(item) {
    console.log($scope.selectedName);
    loadJSON(titleObject[item], function(json){  
      var str = JSON.stringify(json, undefined, 4);
      output(syntaxHighlight(str));
    })
  }


  function loadJSON(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file + '.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
  }
  
  function output(json) {
    var jsonArea = document.getElementById("prettyJson");
    jsonArea.innerHTML = json;
    jsonArea.setAttribute("style", "visibility: visible;");
  }
  
  function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  }

});






