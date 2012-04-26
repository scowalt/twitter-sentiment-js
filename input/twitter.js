var twitter = require('ntwitter');
var face = require('../parsers/face.js');
var secrets = require('../prefs/secrets.js');
var output = require('../output/push.js');
var words = require('../parsers/dict.js');

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
			//send data to the face parser
			face.score(data, output.push);
		});
		stream.on('end', function(response) {
			// TODO: Handle a disconnection
		});
		stream.on('destroy', function(response) {
			// TODO: Handle a 'silent' disconnection from Twitter, no end/error event fired
		});
	});
}