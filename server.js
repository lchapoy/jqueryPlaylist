var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var request = require('request');

var app = express();

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
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

app.get('/playList',function(req,res,next){
	request('http://www.bbc.co.uk/radio1/playlist.json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		res.status(200).json(JSON.parse(body)) // Show the HTML for the Google homepage.
	  }
	})
});
app.get('/playlist/:id',function(req,res,next){
	/*request('http://www.bbc.co.uk/radio1/artist/', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		res.status(200).json(JSON.parse(body)) // Show the HTML for the Google homepage.
	  }
	})*/
	console.log(req.query);
	res.status(200).send("ok")
});

app.use('*',function(req,res,next){
    res.status(404).send('Error 404aa Tha page does not exists');
});
app.listen(3000,function(){
    console.log(' Listening to port  3000')
});

module.exports=app;