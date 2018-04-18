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

	const { $cgiType: cgiType, originalUrl } = request;
	Logger.error({
		info: '[internal error] =>' + originalUrl,
		detail: err.stack,
		reqSeqId: request.$reqSeqId,
	});
	if(cgiType === 'ajax' || cgiType === 'jsonp') {

		const error = ERROR.create('SERVER_RESPONSE_ERROR', {
			'msg': '${msg}[Server]',
		});
		utilLib.resJson(error, ctx);
	} else {
		await utilLib.render50X(ctx);
	}
};