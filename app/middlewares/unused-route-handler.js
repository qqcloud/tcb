/**
 * unused route handler
 */
const utilLib = require('../libs/utillib');

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