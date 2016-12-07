var q = require('q'),
	helpers = require('./helpers');

console.log('');
console.log('Running...');
console.log('');


/*
 * Justification of promises
 * The justification is avoiding the callback pyramid of death
*/
 
helpers.nodeCallback(true, function(err, result) {
	helpers.nodeCallback(true, function(err, result) {
		helpers.nodeCallback(true, function(err, result) {
			helpers.nodeCallback(true, function(err, result) {
				console.log('FINALLY');
			});
		});
	});
});


/*
 * Returning stuff and rejecting stuff 
 * The alternative to the pyramic of death is being able to chain together promises
 
q()
	.then(function(result) {
		return 'foo';
	})
	.then(function(result) {
		console.log('Result is the value \'foo\':');
		console.log(result)
		return 'bar';
	})
	.then(function(result) {
		console.log('Result is the value \'bar\'');
		console.log(result)
		return 'baz';
	})
	.then(function(result) {
		console.log('Result is the value \'baz\'');
		console.log(result)
	});
*/


/*
 * Simple resolve/reject
*/
//helpers.simple(true);
//helpers.simple(false);




/*
 * Error from within a resolve/reject
 */
//helpers.error(true);
//helpers.error(false);



/*
 * Error handler will catch the error or reject

helpers.error(true)
	.then(function(result) {
		console.log('Went to the final resolve handler');
	}, function(err) {
		console.log('Went to the final reject handler');
		console.log(err);
	});
*/

/*
helpers.error(false)
	.then(function(result) {
		console.log('Went to the final resolve handler');
	}, function(err) {
		console.log('Went to the final reject handler');
		console.log(err);
	});
*/




/*
 * Using done will force the error to be thrown
helpers.error(true)
	.done();
/*



/*
 * Not using done will effectively hide the error
 
helpers.error(true);
*/



 /*
  * Make node resolver
  
var deferred = q.defer();
helpers.nodeCallback(true, deferred.makeNodeResolver());
deferred.promise
	.then(function(result) {
		console.log('Ended up in the resolve handler');
	}, function(err) {
		console.log('Ended up in the reject handler');
	});
*/


/*
 * all vs all settled
 * All will run all tasks in parallel but if any one fails, it will
 * immediately invoke the reject handler and may not run the rest
 * of the tasks.
 
q.all([
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(true)])
	.then(function() {
		console.log('Resolved!');
	}, function() {
		console.log('Rejected!');
	});
*/

/*
 * all vs all settled
 * All settled will ensure that all run regardless of whether any or all fail
 * or succeed. In this case, the fail handler never gets called, only the
 * success handler, and it is passed an array of objects indicating the status
 * and result of each task

q.allSettled([
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(false),
	helpers.getPromise(true)])
	.then(function() {
		console.log('Resolved!');
	}, function() {
		console.log('Rejected!');
	});
*/