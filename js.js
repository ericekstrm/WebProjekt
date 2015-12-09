function addChatMessage(whereToAdd, jsonStrukt) {

    var template = $("#messageTemplate").html();
    var renderer = Handlebars.compile(template);

    $(whereToAdd).find(".answers").append(renderer(jsonStrukt));
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

$(".svara").click(function () {
    console.log("hej");
    //$("#answerBox").css("display", "initial");
    var x = $(this).parent().find(".answerBox").css("display", "initial");
    $(this).css("display", "none");
});