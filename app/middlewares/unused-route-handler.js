/**
 * 处理未被使用（未命中）的路由
 */
const utilLib = require('../libs/utillib');

module.exports = async (ctx, next) => {
	const {request, response} = ctx;
	const {$cgiType} = request;

	if($cgiType === 'ajax'){

	} else {
		await utilLib.render404(ctx);
	}
};