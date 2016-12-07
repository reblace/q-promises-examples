var q = require('q');

function getPromise (pass) {
	var defer = q.defer();
	if(pass) {
		console.log('promise will resolve');
		defer.resolve('This is a resolved result');
	}
	else {
		console.log('promise will reject');
		defer.reject('This is an error from a reject');
	}
	return defer.promise;
}

function simple(pass) {
	return getPromise(pass)
		.then(function(result) {
			console.log('This is a resolved result');
			console.log(result);
		}, function(err) {
			console.log('This is an error from a reject');
			console.log(err);
		});
}

function error(pass) {
	return getPromise(pass)
		.then(function(result) {
			console.log('The promise was Resolved');
			console.log(result);
			throw new Error('This is an error from in a resolve');
		}, function(err) {
			console.log('The promise was Rejected');
			console.log(err);
			throw new Error('This is an error from in a reject');
		});
}

function nodeCallback(pass, cb) {
	if(pass) {
		cb(null, 'This is a successful callback from node!');
	}
	else {
		cb(new Error('This is an error callback from node!'));
	}
}


module.exports.getPromise = getPromise;
module.exports.simple = simple;
module.exports.error = error;
module.exports.nodeCallback = nodeCallback;