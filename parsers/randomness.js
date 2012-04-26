exports.score = function(data, callback) {
	var s;

	var text = data.tweet.text.toLowerCase();
	//split into char array
	var chars = text.split('');
	chars = removeAlphaNum(chars);

	data.randomness = {
		'exclaimations' : 0,
		'questions' : 0,
		'slashes' : 0
	};

	for(i in chars) {
		if(chars[i] == '!')
			data.randomness.exclaimations += 1;
		if(chars[i] == '?')
			data.randomness.questions += 1;
		if(chars[i] == '/')
			data.randomness.slashes += 1;
	}

	//add score to data
	data.randomness = {
		'score' : data.randomness.questions + Math.floor((Math.random() * 10) + 1)
	};

	//send data to be output
	callback(data);
}
//returns the array with no alphanumeric characters or spaces
function removeAlphaNum(arr) {
	//letters
	for(var i = 97; i <= 122; i++) {
		arr.removeAll(String.fromCharCode(i));
	}
	//numbers
	for(var i = 48; i <= 57; i++) {
		arr.removeAll(String.fromCharCode(i));
	}
	//spaces
	arr.removeAll(' '); arr;
}

// adds a remove function to the Array object
Array.prototype.removeAll = function(obj) {
	var loop = true;
	while(loop) {
		var i = this.indexOf(obj);
		if(i != -1) {
			this.splice(i, 1);
		} else {
			loop = false;
		}
	}
};
