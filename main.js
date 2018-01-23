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

            $('.bodyJson').JSONView(json);
            bodyJson = json;

        });

    });

    $('.callApi').on('click', function() {

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/processor",
            data: bodyJson,
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        }).done(function(response) {

            $('.ruleSets').html("<h5>Rule Sets</h5>");

            $('.processId').find("p").text(response.processorId)
            $('.date').find("p").text(response.createdAt);
            $('.reference').find("p").text(response.reference);

            console.log(response);

            response.ruleSets.forEach(ruleset => {

                var ID = createRuleProperty("ID : ", ruleset.ruleSetId);
                ID.classList.add('ruleLineSplit');

                var PTime = createRuleProperty("Processing Time : ", ruleset.processingTime);

                var Deferred = createRuleProperty("Deferred Count : ", ruleset.deferredCount);
                Deferred.classList.add('deferredProp', 'ruleLineSplit');

                var Matches = document.createElement("div");
                Matches.className = "propContainer";
                var MatchesHead = document.createElement("p");
                MatchesHead.textContent = "Matches (" + ruleset.matchedCount + ") :";
                MatchesHead.className = "prop";
                Matches.append(MatchesHead);

                var ruleDiv = document.createElement("div");
                ruleDiv.setAttribute('class', 'rule');
                ruleDiv.append(ID, Deferred, PTime, Matches);

                ruleset.matches.forEach(match => {

                    var MatchCtn = document.createElement("div")
                    MatchCtn.className = "propContainer matchContainer";

                    var MatchName = document.createElement("p");
                    MatchName.textContent = match.entityType;
                    MatchName.className = "prop";

                    MatchCtn.append(MatchName);
                    ruleDiv.append(MatchCtn);

                    match.rules.forEach(rule => {

                        var RuleCtn = document.createElement("div")
                        RuleCtn.className = "propContainer ruleContainer";

                        var RuleId = document.createElement("p");
                        RuleId.textContent = rule.ruleId + " : ";
                        RuleId.className = "prop";

                        RuleCtn.append(RuleId);
                        ruleDiv.append(RuleCtn);

                        var tagsContainer = document.createElement("input");
                        tagsContainer.type = "text";
                        tagsContainer.className = "tagsInput";
                        var attrRole = document.createAttribute("data-role");
                        attrRole.value = "tagsinput"
                        tagsContainer.setAttributeNode(attrRole);
                        tagsContainer.disabled = true;


                        var attrVal = document.createAttribute("value");
                        attrVal.value = "";

                        rule.tags.forEach(tag => {
                            if (attrVal.value === "") {
                                attrVal.value += tag;
                            } else {
                                attrVal.value += "," + tag;
                            }

                        });
                        tagsContainer.setAttributeNode(attrVal);

                        ruleDiv.append(tagsContainer);

                    });


                });


                ruleDiv.append(document.createElement("hr"));
                $(".ruleSets").append(ruleDiv);


                $(".tagsInput").tagsinput("refresh");
            });
        });

        function createRuleProperty(title, value) {
            var head = document.createElement("p");
            head.textContent = title;
            head.className = "prop";
            var body = document.createElement("p");
            body.textContent = value;
            body.className = "val";

            var div = document.createElement("div")
            div.className = "propContainer";
            div.append(head, body);


            return div;
        }

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