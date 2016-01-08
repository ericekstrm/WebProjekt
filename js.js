var myDataRef;

$(document).ready(function () {
    myDataRef = new Firebase('https://glowing-heat-4267.firebaseio.com/firebaseTest');

    addAnswerListeners();
    addFirebaseListeners();
});

function addChatMessage(whereToAdd, jsonStrukt) {
    myDataRef.push(jsonStrukt);
}

$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var message = $("#messageInput").val();

        var json = {name: name, message: message, date: new Date().toDateString()};

        addChatMessage("#mainWindow", json);
    }
});

function addAnswerListeners() {
    //displays the box for answering messages and hides the "Svara" link
    $(".svara").off();
    $(".svara").click(function () {
        $(this).parent().children(".answerBox").css("display", "initial");
        $(this).css("display", "none");
    });

    $(".svaraConfirm").off();
    $(".svaraConfirm").click(function () {
        var parentBox = $(this).parent().parent();

        var message = parentBox.children(".answerBox").children("textarea").val();
        console.log(message);
        var json = {name: "Eric", message: message, date: new Date().toDateString()};

        addChatMessage(parentBox, json);

        parentBox.children(".answerBox").css("display", "none");
        parentBox.children(".answerBox").children("textarea").val("");
        parentBox.children(".svara").css("display", "initial");
    });

    //hides the box for answering messages and displays the "Svara" link
    $(".cancel").off();
    $(".cancel").click(function () {
        var parentBox = $(this).parent().parent();

        parentBox.children(".answerBox").css("display", "none");
        parentBox.children(".answerBox").children("textarea").val("");
        parentBox.children(".svara").css("display", "initial");
    });
}

function addFirebaseListeners() {
    myDataRef.on('child_added', function (snapshot) {
        var template = $("#messageTemplate").html();
        var renderer = Handlebars.compile(template);

        var message = snapshot.val();
        $("#mainWindow").children(".answers").append(renderer(message));
        addAnswerListeners();
    });
}
