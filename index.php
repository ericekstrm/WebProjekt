<!DOCTYPE html>
<?php
if (isset($_GET["t"])) {
    if ($_GET["t"] != "") {
        $currentThread = filter_input(INPUT_GET, 't', FILTER_SANITIZE_SPECIAL_CHARS);
    } else {
        $currentThread = "startsida";
    }
} else {
    $currentThread = "startsida";
}
?>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/thread.css">

        <title>Awesome ChatSida</title>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.3/handlebars.min.js"></script>
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
        <script type="text/x-handlebars-template" id="threadTemplate">
            <div id="threadMain" style=" left:{{left}}px; top:{{top}}px;">
            <input type='text' id='threadName' placeholder='Name of Thread'>
            <textarea id="threadText" placeholder="Skriv en kommentar" ></textarea>
            <button id="threadConfirm">Skapa Tråd</button>
            <a id="threadCancel">Cancel</a>
            </div>
        </script>
        <script type="text/javascript">
            var currentThread = "<?php print($currentThread); ?>";
        </script>
    </head>
    <body>
        <div id="header">
            <input type='text' id='nameInput' placeholder='Chose a Screen Name'>
        </div>
        <div id="content">
            <div id="<?php print($currentThread) ?>" class="mainWindow">
                <div id="answers">
                </div>
                <a class="svara">Svara</a>
                <div class="answerBox" style="display: none;">
                    <textarea rows="4" cols="40" placeholder="Skriv ett svar" ></textarea>
                    <br>
                    <button class="svaraConfirm">Svara</button>
                    <a class="cancel">Cancel</a>
                </div>
            </div>
            <div id="sidePanel">
                <h3>Trådar</h3>
                <ul>
                </ul>
                <a id="addThread">Ny Tråd</a>
            </div>
        </div>
        <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
        <script type="text/javascript" src="js/js.js"></script>
    </body>
</html>
