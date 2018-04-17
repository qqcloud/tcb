/**
 * request
 */
const rp = require('request-promise-native');
const util = require('./util');
const utilLib = require('../../utillib');

module.exports = async (opts) => {

	const reqOpts = util.getReqOpts(opts);

	return new Promise(async (reslove, reject) => {
		try {
			const res = await rp(reqOpts);
			const { statusCode, body, elapsedTime: timeCost, timingStart: timeStart } = res;
			if(statusCode === 404){
				reject(ERROR.create('404', {
					'msg': 'Backend ${msg}',
					'detail': { statusCode, body },
				}));
			} else {
				Logger.info('[request info] =>', {reqOpts, body, timeCost, timeStart});
				reslove(body);
			}
		} catch (err) {
			Logger.error('[request error] =>', err);

			const { statusCode, code, message } = err;
			let error;

			if (code === 'ETIMEDOUT') {
				error = ERROR.create('SERVER_RESPONSE_TIMEOUT', {
					'msg': 'Backend ${msg}',
					'detail': { err: message },
				});
			} else if(ERROR.errorTypes[statusCode]) {
				error = ERROR.create(statusCode, {
					'msg': 'Backend ${msg}',
					'detail': { err: message },
				});
			} else {
				error = ERROR.create('SERVER_RESPONSE_ERROR', {
					'msg': 'Backend ${msg}',
					'detail': { err: message },
				});
			}

			reject(error);
		}
	});
};
