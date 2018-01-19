
$(document).ready(function () {
  var titleObject = new Object();


  loadJSON("title", function (json) {
    titleObject = JSON.parse(json);
    var fileName = Object.getOwnPropertyNames(titleObject);
    console.log(fileName);
    for (var i=0;i<fileName.length;i++){
      $('<option/>').val(titleObject[fileName[i]]).text(fileName[i]).appendTo('.selectFile');
    }
  });

  $('.submitFile').on('click', function() {
    console.log('Select Value is ' + $('.selectFile').val());
    loadJSON($('.selectFile').val(), function (json) {
      console.log('JSON load')
      // var str = JSON.stringify(json, undefined, 4);
      document.getElementById("prettyJson").setAttribute("style", "visibility: visible;");
      $('.prettyJson').jsonView(json);    
      

      //output(syntaxHighlight(str));
    })
  })





  function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'Useless/' + file + '.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  function output(json) {
    
    // var jsonArea = document.getElementById("prettyJson");
    // jsonArea.innerHTML = json;
    document.getElementById("prettyJson").setAttribute("style", "visibility: visible;");
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
