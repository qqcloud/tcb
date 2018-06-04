/**
 * Request logger middleware
 * @module app/middlewares/request-logger
 */

/**
 * Add request logger
 * @author jerishi
 * @DateTime 2018-05-30
 * @param    {Object}     ctx   app ctx
 * @param    {Function}   next  app next
 */
module.exports = async (ctx, next) => {
	const { request } = ctx;
	const method = request.method.toUpperCase();
	const data = method === 'POST' ? request.body : method === 'GET' ? request.query : void(0);
	
	const requestInfo = JSON.stringify({
		'url': request.originalUrl,
		'method': method,
		'headers': request.headers,
		// for view post data
		'data': data,
		// for trace request
		'reqSeqId': request.$reqSeqId,
	});

	Logger.info('[request] =>' + requestInfo);
	await next();
};