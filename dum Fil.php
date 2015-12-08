
ett meddelande
<div class="message">
    <h1>NAMN</h1><h2>DATUM</h2>
    <hr color="black">
    <p></p>
    <div class="answers">(nya svar här!)</div>
    <a class="svara">Svara</a>
</div>


firebase exempel
<!doctype html>
<html>
    <head>
        <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
        <link rel='stylesheet' type='text/css' href='/resources/tutorial/css/example.css'>
    </head>
    <body>
        <div id='messagesDiv'></div>
        <input type='text' id='nameInput' placeholder='Name'>
        <input type='text' id='messageInput' placeholder='Message'>
        <script>
            var myDataRef = new Firebase('https://giey4u1ytvd.firebaseio-demo.com/');
            $('#messageInput').keypress(function (e) {
                if (e.keyCode == 13) {
                    var name = $('#nameInput').val();
                    var text = $('#messageInput').val();
                    //json strukt
                    myDataRef.push({name: name, text: text});
                    $('#messageInput').val('');
                }
            });
            myDataRef.on('child_added', function (snapshot) {
                var message = snapshot.val();
                displayChatMessage(message.name, message.text);
            });
            function displayChatMessage(name, text) {
                $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
                $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
            }
            ;
        </script>
    </body>
</html>


<script>
    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            //json strukt
            var json = {name: name, text: text};

            displayChatMessage(json.name, json.text);
        }
    });
    function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name + ': '))
                .appendTo($('#messagesDiv'));
    }
</script>
