exports.push = function(data) {
	//TODO: Send to server function
	console.log("=================");
	console.log("Time:", data.tweet.created_at);
	console.log("Text:", data.tweet.text);
	console.log("Randomness:", data.randomness);
	console.log("Sentiment score:", data.text_sentiment.score);
	console.log("Recognized words:", data.text_sentiment.recognized_words);
	console.log("Unrecognized words:", data.text_sentiment.unrecognized_words);
};
