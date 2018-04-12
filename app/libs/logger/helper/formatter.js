const { format } = require('winston');
const { printf } = format;
const timestamp = require('./timestamp');

module.exports = printf( info => {
	const stack = _.last(__stack) || {};
	const lineNumber = stack.getLineNumber();

	let fileName = (stack.getFileName() || '');
	fileName = fileName.replace(global.SERVER_ROOT_PATH, '');
	fileName = fileName.replace(/\\/g, '/').replace(/^\//, '');

	return (
		'\n[' + timestamp() + ']' +
		'[' + info.level.toUpperCase() + ']' +
		'[' + [fileName, lineNumber].join(':') + '] ' +
		(info.message !== undefined ? info.message : '') +
		(info.meta && Object.keys(info.meta).length ? '\n    ' + 
		JSON.stringify(info.meta) : '') + '\n'
	);
});