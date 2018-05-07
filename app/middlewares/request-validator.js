/**
 * Request Validator
 */
const {
	rules,
	routesConf,
} = require('../../config').validator;
const Validator = require('../libs/validator')(rules);
const regExp = /(^\/*)|(\/*$)/g;

module.exports = async(ctx, next) => {
	const {
		request,
		action,
	} = ctx;
	const {
		method,
		path
	} = request;
	method = method.toLowerCase();
	path = _.isString(path) ? path.replace(regExp, '') : '';

	const routeConf = _.find(routesConf, (conf, route)=> {
		return path === route.replace(regExp, '');
	});
	const data = method === 'post' ? request.body : method === 'get' ? request.query : request.body;
	if (_.isObject(routeConf)) {
		if (routeConf[action]) {
			const actionConf = routeConf[action];
			const ruleConf = actionConf[method] || actionConf['all'];
			const isValidated = Validator.validate(data, ruleConf);

			if (!isValidated) {
				const {
					$cgiType: cgiType,
					originalUrl
				} = request;
				Logger.error({
					info: '[request invalidated] =>' + originalUrl,
					reqSeqId: request.$reqSeqId,
				});

				const error = ERROR.create('REQUEST_PARAMS_ERROR', {
					'msg': '${msg}[Server]',
				});
				if (cgiType === 'ajax' || cgiType === 'jsonp') {
					utilLib.resJson(error, ctx);
				} else {
					await utilLib.render50X(ctx, error.msg);
				}
				return false;
			}
		}
	}

	await next();
};