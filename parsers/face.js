/*
 * NOTE:
 * This file currently acts as a parser and as input
 */

var api = require('restler');
var secrets = require('../prefs/secrets.js');

var FACE_API_KEY = secrets.face.api_key;
var FACE_API_SECRET = secrets.face.api_secret;

//holds all of the current FACE API calls
var requests = [];

exports.score = function(data, callback) {
	//recursively wait if too many calls
	if(requests.length >= 1) {
		setTimeout(function() {
			exports.score(data, callback);
		}, 1000)
		return;
	}

	var r = api.get(makeDetectUrl(data.tweet.user.profile_image_url)).on('complete', function(faceData) {
		var s;
		
		//if everything exists
		if(faceData.photos && faceData.photos[0].tags.length) {
			var smileInfo = faceData.photos[0].tags[0].attributes.smiling;
			s = smileInfo ? smileInfo.confidence * (smileInfo.value ? 1 : -1) : null;
		} else {
			s = null;
		}
		
		data.face = {
			'rawScore' : s
		};
		callback(data);
		requests.remove(r);
	});

	//add the call to the list
	requests.push(r);
};

/*
 * Makes a url for the face detection api
 * @param (string) URL of img
 * @return (string) API call url
 */
function makeDetectUrl(imgurl) {
	return 'http://api.face.com/faces/detect.json?api_key=' + FACE_API_KEY + '&api_secret=' + FACE_API_SECRET + '&urls=' + imgurl
};

// adds a remove function to the Array object
Array.prototype.remove = function(obj) {
	var i = this.indexOf(obj);
	if(i != -1) {
		this.splice(i, 1);
	}
};
