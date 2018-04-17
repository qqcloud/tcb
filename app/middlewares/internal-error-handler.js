/**
 * internal error handle
 */

const config = require('../config');
const utilLib = require('../libs/utillib');

module.exports = async (err, ctx) => {
	const { request, response } = ctx;
	if (response.headersSent) {
		return;
	}

	const { $cgiType: cgiType } = request;
	Logger.error({
		detail: err,
		reqSeqId: request.$reqSeqId,
	});
	if(cgiType === 'ajax' || cgiType === 'jsonp') {
		
		const error = ERROR.create('SERVER_RESPONSE_ERROR', {
			'msg': 'Server ${msg}',
			'detail': { err: message },
		});
		utilLib.resJson(error, ctx);
	} else {
		await utilLib.render50X(ctx);
	}
};