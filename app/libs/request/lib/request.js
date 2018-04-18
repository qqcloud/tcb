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
			if(+statusCode === 404){
				reject(ERROR.create('404', {
					'msg': '${msg}[Backend]',
					'detail': { reqOpts, statusCode, body },
				}));
			} else {
				Logger.info(JSON.stringify({
					info: '[request succ] => ' + reqOpts.url,
					detail: {reqOpts, body, timeCost, timeStart}
				}));
				reslove(body);
			}
		} catch (err) {
			Logger.error(JSON.stringify({
				info: '[request error] => ' + JSON.stringify(reqOpts),
				detail:  err.stack,
			}));

			const { statusCode, code, message } = err;
			let error;

			if (code === 'ETIMEDOUT') {
				error = ERROR.create('SERVER_RESPONSE_TIMEOUT', {
					'msg': '${msg}[Backend]',
					'detail': { err: message },
				});
			} else if(ERROR.errorTypes[statusCode]) {
				error = ERROR.create(statusCode, {
					'msg': '${msg}[Backend]',
					'detail': { err: message },
				});
			} else {
				error = ERROR.create('SERVER_RESPONSE_ERROR', {
					'msg': '${msg}[Backend]',
					'detail': { err: message },
				});
			}

			reject(error);
		}
	});
};
