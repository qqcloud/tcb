/**
 * default config
 */
module.exports = {
	'env': null,
	'host': null,
	'port': 9999,

	// specify log level for `./libs/logger`
	// 可选值: debug, info, warn, error
	'logLevel': 'debug',
	'ROUTE_BASE_PATH': '',
	'SERVER_ROOT_PATH': __dirname, // app.js运行所在目录
	// 日志打印路径（生产环境专用）
	// 'logPath': `/data/${PROJECT_NAME}_logs`,
	'logPath': 'd:/logs',

	// socket超时时间(ms)
	'socketTimeout': 20 * 1000,
};