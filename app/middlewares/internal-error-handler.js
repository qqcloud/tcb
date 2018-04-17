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

	const { $cgiType } = request;
	Logger.error('[internal err] =>', err);
	if($cgiType === 'ajax') {
		// ajax 返回
		ctx.status = 500;
		ctx.body = 'err';
	} else {
		await utilLib.render50X(ctx);
	}
};