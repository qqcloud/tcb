/**
 * 核心url配置 日志会专门打印
 */
module.exports = {
	marker: '*', // 日志染色标记
	regExp: [ // 染色日志匹配正则表达式
		/"seqId"\:"[\w\-]{36}\*{1}"/g,
		/seqId\:[\w\-]{36}\*{1}/g,
	],
	logLevel: 'info', // 日志打印级别
	logPath: '/data/buy_important_logs', // 日志打印目录
	logPrefix: 'qcbuy_winston_', // 日志文件前缀
	datePattern: 'YYYY-MM-DD', // 每天一个日志文件
	maxDays: '90d',
	url: { // 需要重点记录的url配置(1-开启打印；0-关闭打印)
		'home': 1,
	},
};