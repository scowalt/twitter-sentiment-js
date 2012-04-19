//a previously generated dictionary
var dict;

//Syncronously returns a hash table of the dictionary file
//Stores this hash table to dict
exports.get = function(file) {
	if(!dict) {
		var buf = fs.readFileSync('./dicts/' + file);
		dict = parse(buf.toString())
	}
	return dict;
}
//trims extraneous characters
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}
//creates a hash table for the string
function parse(text) {
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