<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/index.css">

        <title>Awesome ChatSida</title>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.3/handlebars.min.js"></script>

        <script type="text/javascript">
            
            <?php
                if (isset($_GET["t"])) {
                    $var = $_GET["t"];
                } else{
                    $var = "startsida";
                }
            
            ?>
            var MyJSStringVar = "<?php Print($var); ?>";
        </script>
    </head>
    <body>
        <div id="header">
            <input type='text' id='nameInput' placeholder='name'>
            <input type='text' id='messageInput' placeholder='Message'>
        </div>
        <script type="text/x-handlebars-template" id="messageTemplate">
            <div class="message" id="{{id}}">
            <h1>{{name}} </h1><h2> {{date}}</h2>
            <hr color="gray">
            <p>{{message}}</p>
            <div id="answers"></div>
            <a class="svara">Svara</a>
            <div class="answerBox" style="display: none;">
            <textarea rows="4" cols="40" placeholder="Skriv ett svar" ></textarea>
            <br>
            <button class="svaraConfirm">Svara</button>
            <a class="cancel">Cancel</a>
            </div>
            </div>
        </script>

        <div id="content">
            <div id="firebaseTest" class="mainwindow">
                <div id="answers">
                </div>
            </div>
            <div id="sidePanel">
                <h3>Trådar</h3>
                <ul>
                </ul>
            </div>
        </div>
        <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
        <script type="text/javascript" src="js/js.js"></script>
    </body>
</html>
