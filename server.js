// Dependencies
// -----------------------------------------------------
var express         = require('express');
var MongoClient = require('mongodb').MongoClient;
var port            = process.env.PORT || 8000;
var bodyParser      = require('body-parser');
var app             = express();





// Logging and Parsing
app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json


// Connect to the db
/*MongoClient.connect("mongodb://localhost:27017/db1", function(err, db) {
    if (err) {
        return console.dir(err);
    }*/
MongoClient.connect("mongodb://anjumfatima26:alphaplus90@ds015398.mlab.com:15398/heroku_4dw6mr61", function(err, db) {
    if (err) {
        return console.dir(err);
    }


var lcn;


// POST Routes
// --------------------------------------------------------
// Provides method for getting the input from user
    app.post('/stores', function(req, res){
        var location= req.body;

        lcn=location.name;

    });

// GET Routes
// --------------------------------------------------------
// Retrieve records for stores in the db according to given input
app.get('/stores', function(req, res){

    var collection = db.collection('stores');

    collection.find({State:lcn},{"Company Name":1,"Address 1":1,Zip:1,City:1,Phone:1,State:1,Lat:1,Lon:1, _id:0}).toArray(function(err, items) {

        res.json(items);

    });
});


});


// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
