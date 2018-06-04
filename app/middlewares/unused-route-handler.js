const utilLib = require('../libs/utillib');

/**
 * Unused route handler middleware
 * @module app/middlewares/unused-route-handler
 */

/**
 * Add unused route handler
 * @author jerishi
 * @DateTime 2018-05-30
 * @param    {Object}     ctx   app ctx
 * @param    {Function}   next  app next
 */
module.exports = async (ctx, next) => {
	const {request, response} = ctx;
	const {$cgiType} = request;

	if($cgiType === 'page'){
		await utilLib.render404(ctx);
	} else {
		ctx.status = 404;
		utilLib.resJson(ERROR.create('404'));
	}
};