var dataBaseLink = 'https://glowing-heat-4267.firebaseio.com/';

$(document).ready(function () {
    //myDataRef = new Firebase('https://glowing-heat-4267.firebaseio.com/firebaseTest/answers');

    addAnswerListeners();
    addFirebaseListeners();
});

function addChatMessage(whereToAdd, jsonStrukt) {
    
    //fetch the full path of the message
    var object = $(whereToAdd).children("#answers");
    var path = "";
    while (object.attr("class") !== "mainwindow") {
        path = object.attr("id") + "/" + path;
        object = object.parent();
    }
    path = object.attr("id") + "/" + path;
    
    console.log(path);

//    var path = "";
//    for (var i = array.length; i > 0; i--) {
//        path += array[i - 1] + "/";
//    }

    console.log(path);
    var myDataRef = new Firebase(dataBaseLink + path);
    myDataRef.push(jsonStrukt);
}

$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var message = $("#messageInput").val();

        var json = {name: name, message: message, date: new Date().toDateString()};

        addChatMessage(".mainWindow", json);
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
        var json = {name: "Eric", message: message, date: new Date().toDateString()};
        addChatMessage(parentBox, json);

        //hides the box for answering messages and displays the "Svara" link
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
    var myDataRef = new Firebase('https://glowing-heat-4267.firebaseio.com/firebaseTest/answers');
    myDataRef.on('child_added', function (snapshot) {
        var template = $("#messageTemplate").html();
        var renderer = Handlebars.compile(template);

        var parentId = snapshot.ref().parent().parent().key();

        var data = snapshot.val();
        var path = snapshot.ref();
        //bland det fulaste jag nånsin skrivit 
        data = {date: data.date, message: data.message, name: data.name, id: path.key()};
        console.log(data);
        addMessage(data, parentId, renderer);
        addAnswerListeners();
    });
}

function addMessage(message, whereToAdd, renderer) {
    $("#" + whereToAdd).children("#answers").append(renderer(message));
}
