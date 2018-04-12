/**
 * 处理未被使用（未命中）的路由
 */

module.exports = async (ctx, next) => {
	const {request, response} = ctx;
	const originUrl = request.originUrl;

	ctx.status = 404;

	if(/\/ajax\//.test(originUrl)){

	} else {
		await ctx.render('404');
	}
};