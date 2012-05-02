var prefs = require('../prefs/prefs.js');

exports.push = function(data) {
	//TODO: Send to server function
	data.weights = {
		'happiness' : truncate(data.text_sentiment.score),
		'excitement' : truncate(prefs.score.min + data.text_sentiment.recognized.length + data.randomness.exclamations),
		//TODO Add followers per tweet to excitement
		'confusion' : truncate(data.randomness.score),
	};
	printInfo(data);
}
function printInfo(data) {
	console.log("=======================================");
	console.log("Time:", data.tweet.created_at);
	console.log("Text:", data.tweet.text);
	console.log("Randomness:", data.randomness);
	console.log("Sentiment score:", data.text_sentiment.score);
	console.log("Recognized words:", data.text_sentiment.recognized_words);
	console.log("Unrecognized words:", data.text_sentiment.unrecognized_words);
}

function truncate(n) {
	n = (n > prefs.score.max) ? prefs.score.max : n;
	n = (n < prefs.score.min) ? prefs.score.min : n;
	return n;
}