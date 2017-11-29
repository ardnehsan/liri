var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


var twtClient = new Twitter(keys.twitter);
var sptSearch = new Spotify(keys.spotify);
