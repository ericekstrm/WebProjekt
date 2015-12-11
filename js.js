$(document).ready(function(){
    reAddListeners();
});

function addChatMessage(whereToAdd, jsonStrukt) {

    var template = $("#messageTemplate").html();
    var renderer = Handlebars.compile(template);

    $(whereToAdd).children(".answers").append(renderer(jsonStrukt));

    reAddListeners();
}

$('#messageInput').keypress(function (e) {
    console.log("japp");
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var message = $("#messageInput").val();
        //json strukt
        var json = {name: name, message: message, date: new Date().toDateString()};

        addChatMessage("#mainWindow", json);
    }
});

function reAddListeners() {
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
        parentBox.children(".svara").css("display", "initial");
    });
    
    $(".cancel").off();
    $(".cancel").click(function(){
        var parentBox = $(this).parent().parent();
        
        parentBox.children(".answerBox").css("display", "none");
        parentBox.children(".svara").css("display", "initial");
    });
}
