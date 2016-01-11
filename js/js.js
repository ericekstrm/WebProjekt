var dataBaseLink = 'https://glowing-heat-4267.firebaseio.com/';

$(document).ready(function () {
    addPushListeners();
    addPullListeners();
    addThreadListeners();
});

function pushToFirebase(whereToAdd, jsonStrukt) {

    //fetch the full path of the message
    var object = $(whereToAdd).children("#answers");
    var path = "";
    while (object.attr("class") !== "mainwindow") {
        path = object.attr("id") + "/" + path;
        object = object.parent();
    }
    path = object.attr("id") + "/" + path;

    var myDataRef = new Firebase(dataBaseLink + path);
    myDataRef.push(jsonStrukt);
}

function addPushListeners() {
    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var message = $("#messageInput").val();

            var json = {name: name, message: message, date: new Date().toDateString()};

            pushToFirebase(".mainWindow", json);
        }
    });

    $(".svara").off();
    $(".svara").click(function () {
        $(this).parent().children(".answerBox").css("display", "initial");
        $(this).css("display", "none");
    });

    $(".svaraConfirm").off();
    $(".svaraConfirm").click(function () {
        var parentBox = $(this).parent().parent();

        var message = parentBox.children(".answerBox").children("textarea").val();
        var json = {name: "Eric", message: message, date: new Date().toDateString()};
        pushToFirebase(parentBox, json);

        parentBox.children(".answerBox").css("display", "none");
        parentBox.children(".answerBox").children("textarea").val("");
        parentBox.children(".svara").css("display", "initial");
    });

    $(".cancel").off();
    $(".cancel").click(function () {
        var parentBox = $(this).parent().parent();

        parentBox.children(".answerBox").css("display", "none");
        parentBox.children(".answerBox").children("textarea").val("");
        parentBox.children(".svara").css("display", "initial");
    });
}

function addPullListeners() {
    var myDataRef = new Firebase('https://glowing-heat-4267.firebaseio.com/' + MyJSStringVar + '/answers');

    var template = $("#messageTemplate").html();
    var renderer = Handlebars.compile(template);

    myDataRef.on('child_added', function (snapshot) {
        printSnapshot(snapshot);
    });

    myDataRef.on('child_changed', function (snapshot) {
        printSnapshot(snapshot);
    });

    //rikursiv funktion för att gå igenom alla medelanden och svar
    function printSnapshot(snapshot) {
        var rawData = snapshot.val();
        var path = snapshot.ref();
        var parentId = path.parent().parent().key();

        if (document.getElementById(path.key()) === null) {
            var data = {date: rawData.date, message: rawData.message, name: rawData.name, id: path.key()};
            addMessage(data, "#" + parentId, renderer);
        }

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
    var myDataRef = new Firebase(dataBaseLink);

    myDataRef.on('child_added', function (snapshot) {
        var name = snapshot.ref().key();
        $("#sidePanel").children("ul").append("<li><a href='?t=" +
                name + "'>" + name + "</a></li>");
    });

    $("#addThread").click(function () {
        var template = $("#threadTemplate").html();
        var renderer = Handlebars.compile(template);

        var pos = $(this).offset();
        $("#content").append(renderer({top: pos.top, left: pos.left}));
    });
}
