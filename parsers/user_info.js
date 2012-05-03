exports.get = function(data, callback) {
	var user = data.tweet.user;
	data.user_info = {
		"followers_per_tweet" : user.followers_count / user.statuses_count,
	};
	//send to be output
	callback(data);
}