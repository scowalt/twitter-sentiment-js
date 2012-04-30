//project requirements
var util = require('util');
var rl = require('readline');
var face = require('./parsers/face.js');
var secrets = require('./prefs/secrets.js');
var output = require('./output/push.js');
var words = require('./parsers/words.js');
var twitter = require('./input/twitter.js');

var i = rl.createInterface(process.stdin, process.stdout, null);
i.setPrompt("==>");
i.prompt();

//console functionality
i.on('line', function(a) {
	a = a.replace(/^\s+|\s+$/g, '');
	switch(a) {
		case "start":
			i.question("Search term: ", function(a) {
				twitter.startStream(a);
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

// //written by Pavel Bakhilau
// function pausecomp(ms) {
// ms += new Date().getTime();
// while(new Date() < ms) {
// }
// }