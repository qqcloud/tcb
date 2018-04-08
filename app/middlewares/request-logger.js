/**
 * Request Logger
 */
module.exports = (ctx, next) => {
	const { request } = ctx;
	const method = request.method.toUpperCase();
	
	const requestInfo = JSON.stringify({
		'url': request.originalUrl,
		'method': method,
		'headers': request.headers,
		// for view post data
		'body': method === 'POST' ? request.body : void(0),
		// for trace request
		'reqSeqId': request.reqSeqId,
	});

	// logger.info('[request] =>', requestInfo);
	next();
};