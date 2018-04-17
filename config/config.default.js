/**
 * default config
 */
module.exports = {
	'env': null,
	'host': null,
	'port': 9999,

	'PROJECT_NAME': 'tcb',
	'ROUTE_BASE_PATH': '',

	// 后台service超时时间(ms)
	'serviceTimeout': 20 * 1000,
	// node server超时时间(ms)
	'serverTimeout': 25 * 1000,

	'log': {
		'normal': {
			'level': 'debug', // 可选值: debug, info, warn, error
			'path': `/data/${this.PROJECT_NAME}_logs`, // 日志打印路径
			'prefix': `${this.PROJECT_NAME}`,
			'maxDays': '10d',
			'datePattern': 'YYYY-MM-DD-HH',
		},
		'important': {
			'level': 'info', // 日志打印级别
			'path': `/data/${this.PROJECT_NAME}_important_logs`, // 日志打印目录
			'prefix': `${this.PROJECT_NAME}`, // 日志文件前缀
			'datePattern': 'YYYY-MM-DD', // 每天一个日志文件
			'maxDays': '90d',

			'on': 1,
			'marker': '*', // 日志染色标记
			'regExp': [ // 染色日志匹配正则表达式
				/"seqId"\:"[\w\-]{36}\*{1}"/g,
				/seqId\:[\w\-]{36}\*{1}/g,
			],

			'url': { // 需要重点记录的url配置(1-开启打印；0-关闭打印)
				'home': 1,
			},
		},
	},
};