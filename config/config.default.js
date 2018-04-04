/**
 * default config
 */
module.exports = {
	'env': null,
	'host': null,
	'port': 9999,

	'PROJECT_NAME': 'tcb',
	'ROUTE_BASE_PATH': '',

	'logLevel': 'debug', // 可选值: debug, info, warn, error
	//'logPath': `/data/${PROJECT_NAME}_logs`, // 日志打印路径
	'logPrefix': '',

	// socket超时时间(ms)
	'socketTimeout': 20 * 1000,
};