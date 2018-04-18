/**
 * format req/res data for service 
 */
const config = require('../../../config');

module.exports = {
	'mock': {
		// 请求配置
		reqOpts: {
			timeout: 20 * 1000,
			method: 'get',
		},
		// 请求数据包组装
		packReqData(req, interfaceName, para) {
			return {
				version: 1,
				componentName: config.PROJECT_NAME,
				eventId: ~~(Math.random() * 999999999) + 100000000,
				timestamp: Date.now(),
				user: 'auto',
				interface: { interfaceName, para },
				spanId: req.$spanId,
				seqId: req.$reqSeqId,
			};
		},
		// 响应数据包组装
		packResData(result){
			return new Promise((reslove, reject) => {
				if (_.isObject(result) && 'returnCode' in result) {
					reslove({
						code: result.returnCode,
						msg: result.returnMessage || '',
						data: result.data || {},
					});
				} else {
					reject(ERROR.create('503', 'Backend ${msg}'));
				}
			});
		},
	},
};