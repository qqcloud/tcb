/**
 * default config
 */
module.exports = {
	'env': null,
	'host': null,
	'port': 9999,

	'PROJECT_NAME': 'tcb',
	'ROUTE_BASE_PATH': '',

	'log': {
		'level': 'debug', // 可选值: debug, info, warn, error
		'path': `/data/${PROJECT_NAME}_logs`, // 日志打印路径
		'prefix': '${PROJECT_NAME}',
		'maxDays': '10d',
		'datePattern': 'YYYY-MM-DD-HH',
		'markImportant': 1,
	},

	// socket超时时间(ms)
	'socketTimeout': 20 * 1000,
};