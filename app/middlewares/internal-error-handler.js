const utilLib = require('../libs/utillib');

/**
 * Error handler middleware
 * @module app/middlewares/internal-error-handler
 */

/**
 * Add error handler
 * @author jerishi
 * @DateTime 2018-05-30
 * @param    {Object}     err   app err
 * @param    {Function}   ctx   app ctx
 */
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