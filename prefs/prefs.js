exports.dict = {
	'def' : 'AFINN-111-emo-mult-nospace.txt' //default dictionary
}
exports.parse = {
	'split_regex' : /[.,\/ -!?@\*"]/, // .,/-!?@*" or space
	'trim_regex' : /^[\s'"]+|[\s'"]+$/g //whitespace and quotes
}