var prefs = require('../prefs/prefs.js');

exports.push = function(data) {
	//TODO: Send to server function
	data.weights = {
		'happiness' : truncate(data.text_sentiment.score),
		'excitement' : truncate(prefs.score.min / 2 + data.text_sentiment.recognized.length + data.randomness.exclamations + 20 * data.user_info.followers_per_tweet),
		//TODO Add followers per tweet to excitement
		'confusion' : truncate(prefs.score.min + 2 * data.randomness.score),
	};
	printInfo(data);
}
function printInfo(data) {
	console.log("=======================================");
	console.log("Time:", data.tweet.created_at);
	console.log("Text:", data.tweet.text);
	console.log("Weights:", data.weights);
	// console.log("Randomness:", data.randomness);
	// console.log("Sentiment score:", data.text_sentiment.score);
	// console.log("Recognized words:", data.text_sentiment.recognized);
	// console.log("Unrecognized words:", data.text_sentiment.unrecognized);
	// console.log("Followers per tweet:", data.user_info.followers_per_tweet)
}

function truncate(n) {
	n = (n > prefs.score.max) ? prefs.score.max : n;
	n = (n < prefs.score.min) ? prefs.score.min : n;
	n = Math.round(n);
	return n;
}