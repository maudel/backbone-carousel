/**
 * Created by maudel on 10/24/17.
 */
var express = require('express'),
    path = require('path'),
    app = express();

//set the port
app.set('port', 3000);

//tell express that we want to use the www folder
//for our static assets
app.use(express.static(path.join(__dirname, '/')));


app.get('/', function(req, res){

    // save html files in the `views` folder...
    res.sendfile(__dirname + "/index.html");
});

// Listen for requests
var server = app.listen(app.get('port'), function () {
    console.log('The server is running on http://localhost:' + app.get('port'));
});