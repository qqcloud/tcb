/**
 * config of local environment
 */
module.exports = {
	// socket超时时间(ms)
	'socketTimeout': 10 * 1000,

	'service': {
		'mock': 'http:127.0.0.1:9998',
	},

	'log': {
		'normal': {
			'level': 'debug', // 可选值: debug, info, warn, error
		},
		'important': {
			'level': 'info', // 日志打印级别
			'on': 1,
			'marker': '*', // 日志染色标记
		},
	},
};