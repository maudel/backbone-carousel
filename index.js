/**
 * Created by maudel on 10/24/17.
 */
var express = require('express');
var path = require('path');
var app = express();

//set the port
app.set('port', 3000);

//serve static files
app.use(express.static(path.join(__dirname, '/public')));



// serve index.html
app.get('/', function(req, res){

    // save html files in the `views` folder...
    res.sendfile(__dirname + "/index.html");
});

// Reply with a 404 if nothing previously matches.
app.use(function(req, res) {
    res.status(404).send('Not found!');
})

// Listen for requests
var server = app.listen(app.get('port'), function () {
    console.log('The server is running on http://localhost:' + app.get('port'));
});