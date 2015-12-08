<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="main.css">
        <link rel="stylesheet" type="text/css" href="index.css">
        <title>Title</title>

        <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.3/handlebars.min.js"></script>
    </head>
    <body>
        <div id="header">
            <input type='text' id='nameInput' placeholder='name'>
            <input type='text' id='messageInput' placeholder='Message'>
        </div>
        <script type="text/x-handlebars-template" id="messageTemplate">
            <div class="message">
                <h1>{{name}} </h1><h2> {{date}}</h2>
                <hr color="black">
                <p>{{message}}</p>
                <div class="answers"></div>
                <a class="svara">Svara</a>
            </div>
        </script>

        <script>
$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var message = $("#messageInput").val();
        //json strukt
        var json = {name: name, message: message, date: new Date().toDateString()};

        displayChatMessage(json);
    }
});
function displayChatMessage(jsonStrukt) {
    //skapa template
    var template = $("#messageTemplate").html();
    var renderer = Handlebars.compile(template);

    $("#mainWindow").append(renderer(jsonStrukt));
}
        </script>
        <div id="content">
            <div id="mainWindow">
                <div class="message">
                    <h1>Ett Namn</h1><h2> 2015-12-12 12:12</h2>
                    <hr>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent ex diam, pharetra id efficitur gravida, vehicula a elit. </p>
                    <div class="answers"></div>
                    <a class="svara">Svara</a>
                </div>
                <div class="message">
                    <h1>Ett Namn</h1><h2> 2015-12-12 12:12</h2>
                    <hr>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Praesent ex diam, pharetra id efficitur gravida, vehicula a elit. </p>
                    <div class="answer"></div>
                    <a class="svara">Svara</a>
                </div>
            </div>
            <div id="sidePanel">
                <h3>Trådar</h3>
                <ul>
                    <li>1</li>
                </ul>
            </div>
        </div>
    </body>
</html>
