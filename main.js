$(document).ready(function() {
    var titleObject = new Object();
    var bodyJson = "";


    loadJSON("title", function(json) {

        titleObject = JSON.parse(json);
        var fileName = Object.getOwnPropertyNames(titleObject);

        for (var i = 0; i < fileName.length; i++) {
            $('<option/>').val(titleObject[fileName[i]]).text(fileName[i]).appendTo('.selectFile');
        }

    });

    $('.submitFile').on('click', function() {

        loadJSON($('.selectFile').val(), function(json) {

            document.getElementById("requestBody").setAttribute("style", "visibility: visible;");
            $('.bodyJson').JSONView(json);
            bodyJson = json;

        });

    });

    $('.callApi').on('click', function() {

        // $.post("http://localhost:3000/processor", bodyJson, function(result, status) {
        //     if (status === "success") {
        //         $('.resultJson').JSONView(response.data);
        //     }
        // }, "json");

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/processor",
            data: { bodyJson },
            contentType: "application/json;",
            dataType: "json"
        }).done(function(response) {
            $('.resultJson').JSONView(response.data);
            document.getElementById("responseBody").setAttribute("style", "visibility: visible;");
        });

    });


    function loadJSON(file, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'RequestBody/' + file + '.json', true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }


});