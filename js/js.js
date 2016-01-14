var dataBaseLink = 'https://glowing-heat-4267.firebaseio.com/';

$(document).ready(function () {
    addPushListeners();
    addPullListeners();
    addThreadListeners();
    addNameListener();
});

function pushToFirebase(whereToAdd, jsonStrukt) {

    //går igenom alla föräldrar och samanställer en sökväg för firebase
    var object = $(whereToAdd).children("#answers");
    var path = "";
    while (object.attr("class") !== "mainwindow") {
        path = object.attr("id") + "/" + path;
        object = object.parent();
    }
    path = object.attr("id") + "/" + path;

    var dataRef = new Firebase(dataBaseLink + path);
    dataRef.push(jsonStrukt);
}

function addPushListeners() {
    //länken för att få upp dialogen för att svara på medelanden
    $(".svara").off();
    $(".svara").click(function () {
        $(this).parent().children(".answerBox").css("display", "initial");
        $(this).css("display", "none");
    });

    $(".svaraConfirm").off();
    $(".svaraConfirm").click(function () {
        var parentBox = $(this).parent().parent();

        var message = parentBox.children(".answerBox").children("textarea").val();
        var name = "";
        if ($("#nameInput").val() !== "") {
            name = $("#nameInput").val();
        } else {
            alert("du måste välja ett användarnamn!");
            return;
        }
        var date = new Date().toDateString();

        var json = {name: name, message: message, date: date};
        pushToFirebase(parentBox, json);

        parentBox.children(".answerBox").css("display", "none");
        parentBox.children(".answerBox").children("textarea").val("");
        parentBox.children(".svara").css("display", "initial");
    });

    //länk för att stänga ner dialogen
    $(".cancel").off();
    $(".cancel").click(function () {
        var parentBox = $(this).parent().parent();

        parentBox.children(".answerBox").css("display", "none");
        parentBox.children(".answerBox").children("textarea").val("");
        parentBox.children(".svara").css("display", "initial");
    });
}

function addPullListeners() {
    var dataRef = new Firebase('https://glowing-heat-4267.firebaseio.com/' + currentThread + '/answers');

    var template = $("#messageTemplate").html();
    var renderer = Handlebars.compile(template);

    //triggar på när sidan laddas och för alla nya "bas" medelanden
    dataRef.on('child_added', function (snapshot) {
        printSnapshot(snapshot);
    });

    //triggar på nya svar
    dataRef.on('child_changed', function (snapshot) {
        printSnapshot(snapshot);
    });

    //rikursiv funktion för att gå igenom medelandet och alla svar
    function printSnapshot(snapshot) {
        var rawData = snapshot.val();
        var path = snapshot.ref();
        var parentId = path.parent().parent().key();

        //kollar om medelandet redan finns på sidan
        if (document.getElementById(path.key()) === null) {
            var data = {date: rawData.date, message: rawData.message, name: rawData.name, id: path.key()};
            addMessage(data, "#" + parentId, renderer);
        }

        //loopar igenom alla svar
        if (rawData.answers !== null) {
            snapshot.child("answers").forEach(function (childSnapshot) {
                printSnapshot(childSnapshot);
            });
        }
    }

    function addMessage(data, whereToAdd, renderer) {
        $(whereToAdd).children("#answers").append(renderer(data));
        addPushListeners();
    }
}

function addThreadListeners() {
    var dataRef = new Firebase(dataBaseLink);

    //triggar när sidan laddas och på varje ny tråd
    dataRef.on('child_added', function (snapshot) {
        var name = snapshot.ref().key();
        console.log($("#nameInput").val());
        $("#sidePanel").children("ul").append("<li><a class='threadLink'>" + name + "</a></li>");
        $(".threadLink").off();
        $(".threadLink").click(function () {
            window.location.href = "?t=" + $(this).html();
        });
    });

    //skapar ny-tråd dialogen
    $("#addThread").click(function () {
        var template = $("#threadTemplate").html();
        var renderer = Handlebars.compile(template);

        var pos = $(this).offset();
        $("#content").append(renderer({top: pos.top, left: pos.left}));
        bindNewThreadListeners();
    });

    function bindNewThreadListeners() {
        $("#threadConfirm").click(function () {
            //skapar ny tråd och pushar till firebase
            var threadName = $("#threadName").val();
            var threadName = threadName.replace(" ", "_");
            console.log(dataBaseLink + threadName + "/answers/");
            var dataRef = new Firebase(dataBaseLink + threadName + "/answers/");
            var s = $("#threadName").val();
            console.log(s);
            var json = {name: $("#nameInput").val(), message: $("#threadText").val(), date: new Date().toDateString()};
            dataRef.push(json);

            removeNewThreadDialog();

             window.location.href = "?t=" + threadName;
        });

        $("#threadCancel").click(function () {
            removeNewThreadDialog();
        });
    }

    function removeNewThreadDialog() {
        $("#threadMain").remove();

        $("#threadConfirm").off();
        $("#threadCancel").off();

    }
}

function addNameListener(){
    $("#nameInput").attr("value", localStorage["name"]);
    
    $("#nameInput").keyup(function(){
        localStorage["name"] = $("#nameInput").val();
        console.log(localStorage["name"]);
    });
}

