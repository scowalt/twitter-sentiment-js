//project requirements
var twitter = require('ntwitter');
var util = require('util');
var rl = require('readline');
var face = require('./parsers/face.js');
var secrets = require('./prefs/secrets.js');
var output = require('./output/push.js');
var words = require('./parsers/dict.js');

//

//initialize objects
var twit = new twitter(secrets.twitter);
var i = rl.createInterface(process.stdin, process.stdout, null);
//

i.setPrompt("==>");
i.prompt();
i.on('line', function(a) {
	a = a.replace(/^\s+|\s+$/g, '');
	switch(a) {
		case "dict":
			var d = words.get('AFINN-111-emo-mult.txt');
			i.prompt();
			break;
		case "start":
			i.question("Search term: ", function(a) {
				startStream(a);
			});
			break;
		case "stop":
			i.close();
			process.stdin.destroy();
			break;
		case "test":
			console.log("a", "b");
			i.prompt();
			break;
		default:
			console.log("Command unknown. Type \"stop\" to end.")
			i.prompt();
	} //switch
});
function startStream(query) {
	console.log("Starting stream with ", query);
	var filter = {
		'track' : query
	};
	twit.stream('statuses/filter', filter, function(stream) {
		stream.on('data', function(tweet) {
			var data = {
				'tweet' : tweet
			};
			face.score(data, output.push);
		});
		stream.on('end', function(response) {
			// Handle a disconnection
			i.close();
			process.stdin.destroy();
		});
		stream.on('destroy', function(response) {
			// Handle a 'silent' disconnection from Twitter, no end/error event fired
			i.close();
			process.stdin.destroy();
		});
	});
}//i.on(..)

//written by Pavel Bakhilau
function pausecomp(ms) {
	ms += new Date().getTime();
	while(new Date() < ms) {
	}
}