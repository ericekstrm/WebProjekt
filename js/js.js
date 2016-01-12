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

    var dataRef = new Firebase(dataBaseLink + path);
    dataRef.push(jsonStrukt);
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
        var json = {name: $("#nameInput").val(), message: message, date: new Date().toDateString()};
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
    var dataRef = new Firebase('https://glowing-heat-4267.firebaseio.com/' + MyJSStringVar + '/answers');

    var template = $("#messageTemplate").html();
    var renderer = Handlebars.compile(template);

    dataRef.on('child_added', function (snapshot) {
        printSnapshot(snapshot);
    });

    dataRef.on('child_changed', function (snapshot) {
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
    var dataRef = new Firebase(dataBaseLink);

    dataRef.on('child_added', function (snapshot) {
        var name = snapshot.ref().key();
        $("#sidePanel").children("ul").append("<li><a href='?t=" +
                name + "'>" + name + "</a></li>");
    });

    $("#addThread").click(function () {
        var template = $("#threadTemplate").html();
        var renderer = Handlebars.compile(template);

        var pos = $(this).offset();
        $("#content").append(renderer({top: pos.top, left: pos.left}));
        bindNewThreadListeners();
    });
    
    function bindNewThreadListeners(){
        $("#threadConfirm").click(function(){
            var threadName = $("#threadName").val();
            var threadName = threadName.replace(" ", "_");
            console.log(dataBaseLink + threadName + "/answers/");
            var dataRef = new Firebase(dataBaseLink + threadName + "/answers/");
            var s = $("#threadName").val();
            console.log(s);
            var json = {name: $("#nameInput").val(), message: $("#threadText").val(), date: new Date().toDateString()};
            dataRef.push(json);
            
            $("#threadMain").remove();
            unbindNewThreadListeners();
            
            window.location.href = "?t=" + threadName;
        });
        
        $("#threadCancel").click(function(){
            $("#threadMain").remove();
            unbindNewThreadListeners();
        });
    }
    
    function unbindNewThreadListeners(){
        $("#threadConfirm").off();
        $("#threadCancel").off();
        
    }
}
