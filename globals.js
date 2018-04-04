/**
 * define global variables
 */

global.SERVER_ROOT_PATH = __dirname; // server root directory
global._ = require('lodash');

Object.defineProperty(global, '__stack', {
	get() {
		const orig = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, stack) => stack;
		const err = new Error;
		Error.captureStackTrace(err, arguments.callee);
		const stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	},
});