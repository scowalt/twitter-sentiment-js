var prefs = require('../prefs/prefs.js');
var user_info = require('../parsers/user_info.js');

//a previously generated dictionary
var dict;

exports.score = function(data, callback) {
	//TODO: Do stuff
	exports.get(prefs.dict.def);
	words = parseWords(data.tweet.text.toLowerCase());
	var s = 0, m = 1, recognized = [], unrecognized = [];
	for(i in words) {
		//if word found
		if(words[i] in dict) {
			//if not multiplication
			if(dict[words[i]].indexOf('*') == -1) {
				s += parseInt(dict[words[i]]);
			} else {
				m += parseInt(dict[words[i]].substring(1));
			}
			recognized.push(words[i]);
		} else {
			unrecognized.push(words[i]);
		}
	}
	data.text_sentiment = {
		'score' : (s * m),
		'recognized' : recognized,
		'unrecognized' : unrecognized
	};

	//send to user_info
	user_info.get(data, callback);
}
//returns all of the words in the tweet
//@param <String>
//@return <Array:String>
function parseWords(text) {
	var words;
	words = text.split(prefs.parse.split_regex);
	for(i in words) {
		if( typeof (words[i]) == 'string') {
			words[i] = words[i].trim();
		}
	}

	return words;
}

//Syncronously returns a hash table of the dictionary file
//Stores this hash table to variable dict
exports.get = function(file) {
	if(!dict) {
		var buf = fs.readFileSync('./dicts/' + file);
		dict = parseDict(buf.toString());
	}
	return dict;
}
//creates a hash table for the string
function parseDict(text) {
	var result = {};
	var lines = text.split('\n');
	for(var i = 0; i < lines.length; i++) {
		var parts = lines[i].trim().split(/\s/);
		var term = parts[0].trim();
		var score = parts[1].trim();
		result[term] = score;
	}
	return result;
}

//trims extraneous characters
String.prototype.trim = function() {
	return this.replace(prefs.parse.trim_regex, '');
}
// adds a remove function to the Array object
Array.prototype.remove = function(obj) {
	var i = this.indexOf(obj);
	if(i != -1) {
		this.splice(i, 1);
	}
};
