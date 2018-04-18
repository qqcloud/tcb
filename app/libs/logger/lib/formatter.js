const { format } = require('winston');
const { printf } = format;
const timestamp = require('./timestamp');

module.exports = printf( info => {
	let stack = _.last(__stack) || {};
	let lineNumber = stack.getLineNumber();
	let fileName = stack.getFileName() || '';
	
	// 兼容stack取值错误
	if(!lineNumber || !fileName) {
		const stackLen = __stack.length;
		if(stackLen && __stack[stackLen - 2]) {
			stack = __stack[stackLen - 2];
			lineNumber = stack.getLineNumber();
			fileName = (stack.getFileName() || '');
		}
	}
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