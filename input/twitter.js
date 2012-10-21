var twitter = require('ntwitter');
var secrets = require('../prefs/secrets.js');
var output = require('../output/push.js');
var words = require('../parsers/words.js');
var randomness = require('../parsers/randomness.js');

//initialize objects
var twit = new twitter(secrets.twitter);

//stream
exports.startStream = function(query) {
	console.log("Starting stream with:", query);
	var filter = {
		'track' : query
	};
	twit.stream('statuses/filter', filter, function(stream) {
		stream.on('data', function(tweet) {
			var data = {
				'tweet' : tweet
			};
			//console.log("Incoming Time:", data.tweet.created_at);
			//TODO: send data to the face parser
			randomness.score(data, output.push);
		});
		stream.on('error', function(error) {
			console.log("Error in twitter module");
			//console.log(error);
		})
		stream.on('end', function(response) {
			// TODO: Handle a disconnection
		});
		stream.on('destroy', function(response) {
			// TODO: Handle a 'silent' disconnection from Twitter, no end/error event fired
		});
	});
}