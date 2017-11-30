
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

//new objects for Twitter and Spotify clients
var twit = new Twitter(keys.twitter);
var spot = new Spotify(keys.spotify);

//user input
var input1 = process.argv[2];
var input2 = process.argv[3];


//function to take the command and input from user to pass through functions
function commandInput(command, userInput)
	{
		switch(command){
			case "do-what-it-says":
			readRandom();
			break;
			case "my-tweets":
			myTweets();
			break;
			case "spotify-this-song":
			spotifySong(userInput);
			break;
			case "movie-this":
			movieInfo(userInput);
			break;
		}
	}

//calling the commandInput function for the user input
commandInput(input1, input2);

//function to read the random.txt file
function readRandom()
	{
		fs.readFile("random.txt", "utf8", function(error, data){

		if (error) {
            console.log(error)
        }

        var textInput = data.split(" ");
				console.log(textInput);
       	input1 = textInput[0];
        input2 = textInput[1];


			 	commandInput(input1, input2);

		 })

	 }

//function to display 10 tweets for a user feed
function myTweets()
	{
			var userName = input2;
			var params = {screen_name: userName};
			twit.get('statuses/user_timeline', params, function (error, tweet, response)
			{
				if(error)
				{
					console.error(error);
				}
				else
				{
					for (var i = 0; i < tweet.length; i++)
					{
						console.log(tweet[i].text);
						console.log("By: " + tweet[i].user.screen_name+"\n");
					}
				}


			});
	}

//function to check Spotify for song results
function spotifySong()
	{
		song = input2;

		//if the song is undefined there is a default
		if(song === undefined)
		{
			song = 'Paradise';
		}
					spot.search({type: 'track', query: song, limit: 5}, function(err, data)
					{
					  if (err)
						{
					    return console.log('Error occurred: ' + err);
					  }

						for (var i = 0; i < data.tracks.items.length; i++) {

							console.log("Artist: " + data.tracks.items[i].artists[0].name);
							console.log("Song: " + data.tracks.items[i].name);
							console.log("Preview Link: " + data.tracks.items[i].external_urls.spotify);
							console.log("Album: " + data.tracks.items[i].album.name + "\n");


						}
					});

		}
//function to display movie info from OMDB
function movieInfo()
			{
				var movie = input2;
				//if the movie is undefined there is a default
				if(movie === undefined)
				{
					movie = 'Avengers';
				}
				var url = "http://www.omdbapi.com/?t="+movie+"&apikey=" + keys.omdb.api_key;

				request(url, function (error, response, body) {

		        if (error) {
		            console.log(error)
		        }
		        if (response.statusCode === 200) {


		        var content = JSON.parse(body)

		        console.log("The the title for the movie is: " + content.Title);
		        console.log("This movie was made in: " + content.Year);
						console.log("This movie was made in: " + content.Country);
						console.log("The IMDB rating of the movie is : " + content.Ratings[0].Value);
						console.log("The Rotten Tomato rating for this movie is: " + content.Ratings[1].Value);
		        console.log("The plot of this movie is: " + content.Plot);
		        console.log("The actors in this movie are: " + content.Actors);
		        }
		    })
	}
