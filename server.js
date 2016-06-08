var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var request = require('request');

var app = express(); //Init Express App

//Handle CROS problem
app.use(function(req, res, next) {
    if(req.method=='OPTIONS'){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");

        res.status(204).end();
    }else{
        res.header("Access-Control-Allow-Origin", "*");
        next();
    }


});

app.use(morgan('dev')); //Use to log requests
app.use(bodyParser.urlencoded({'extended': 'true'})); //Parse GET request
app.use(bodyParser.json());	//Parse POST request

//Endpoint to request Notes
app.get('/playList',function(req,res,next){
	//GET playlists from extern API
	request('http://www.bbc.co.uk/radio1/playlist.json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.status(200).json(JSON.parse(body)) // Show the HTML for the Google homepage.
		}		
			res.status(response.statusCode);
	})
});

//Endpoint to update playlist
app.get('/playlist/:id',function(req,res,next){
	//Public API does not allow it
	/*request('http://www.bbc.co.uk/radio1/artist/', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		res.status(200).json(JSON.parse(body)) // Show the HTML for the Google homepage.
	  }
	})*/
	res.status(200).send("ok")
});

//Tell the user that the API was BAD
app.use('*',function(req,res,next){
    res.status(404).send('Error ENDPOINT does not exists');
});
//Init Server
app.listen(3000,function(){
    console.log(' Listening to port  3000')
});
//Export App
module.exports=app;